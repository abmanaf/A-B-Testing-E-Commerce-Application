import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('id');

  let userId: string | null = null;

  try {
    const authResult = await auth();
    userId = authResult?.userId || null;
  } catch (authError) {
    console.error('Auth error:', authError);
    return NextResponse.json([]);
  }

  if (!userId) {
    return NextResponse.json([]);
  }

  try {
    if (orderId) {
      const order = await prisma.order.findFirst({
        where: {
          id: orderId,
          userId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
      return NextResponse.json(order);
    }

    const orders = await prisma.order.findMany({
      where: {
        userId,
        status: 'placed',
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  let userId: string | null = null;

  try {
    const authResult = await auth();
    userId = authResult?.userId || null;
  } catch (authError) {
    console.error('Auth error:', authError);
    return NextResponse.json(
      { error: 'Authentication failed. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { error: 'Please sign in to checkout' },
      { status: 401 }
    );
  }

  let body;
  try {
    const text = await request.text();
    body = text ? JSON.parse(text) : {};
  } catch (parseError) {
    console.error('JSON parse error:', parseError);
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }

  const { shipping } = body;

  if (!shipping || typeof shipping !== 'object') {
    return NextResponse.json(
      { error: 'Shipping information is required' },
      { status: 400 }
    );
  }

  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'address',
    'city',
    'state',
    'zipCode',
    'country',
  ];
  const missingFields = requiredFields.filter((field) => !shipping[field]);

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(', ')}` },
      { status: 400 }
    );
  }

  let cart;
  try {
    cart = await prisma.order.findFirst({
      where: {
        userId,
        status: 'cart',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  } catch (dbError) {
    console.error('Database error finding cart:', dbError);
    return NextResponse.json(
      { error: 'Unable to find your cart. Please try again.' },
      { status: 500 }
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return NextResponse.json(
      { error: 'Your cart is empty. Please add items to your cart first.' },
      { status: 400 }
    );
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const shippingCost = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shippingCost + tax;

  let order;
  try {
    order = await prisma.order.update({
      where: { id: cart.id },
      data: {
        status: 'placed',
        total: grandTotal,
        shippingFirstName: shipping.firstName,
        shippingLastName: shipping.lastName,
        shippingEmail: shipping.email,
        shippingPhone: shipping.phone,
        shippingAddress: shipping.address,
        shippingCity: shipping.city,
        shippingState: shipping.state,
        shippingZipCode: shipping.zipCode,
        shippingCountry: shipping.country,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });
  } catch (updateError) {
    console.error('Error updating order:', updateError);
    return NextResponse.json(
      { error: 'Failed to place order. Please try again.' },
      { status: 500 }
    );
  }

  try {
    await prisma.order.create({
      data: {
        userId,
        status: 'cart',
        total: 0,
      },
    });
  } catch (createError) {
    console.error('Error creating new cart:', createError);
  }

  return NextResponse.json(order);
}
