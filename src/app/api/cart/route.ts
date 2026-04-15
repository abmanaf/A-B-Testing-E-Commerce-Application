import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  let userId: string | null = null;

  try {
    const authResult = await auth();
    userId = authResult?.userId || null;
  } catch (authError) {
    console.error('Auth error in GET /api/cart:', authError);
    return NextResponse.json({ items: [], total: 0 });
  }

  if (!userId) {
    return NextResponse.json({ items: [], total: 0 });
  }

  try {
    let cart = await prisma.order.findFirst({
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

    if (!cart) {
      cart = await prisma.order.create({
        data: {
          userId,
          status: 'cart',
          total: 0,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error in GET /api/cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  let userId: string | null = null;

  try {
    const authResult = await auth();
    userId = authResult?.userId || null;
  } catch (authError) {
    console.error('Auth error in POST /api/cart:', authError);
    return NextResponse.json(
      { error: 'Unauthorized - please sign in' },
      { status: 401 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized - please sign in' },
      { status: 401 }
    );
  }

  try {
    const { productId, quantity = 1 } = await request.json();

    let cart = await prisma.order.findFirst({
      where: {
        userId,
        status: 'cart',
      },
    });

    if (!cart) {
      cart = await prisma.order.create({
        data: {
          userId,
          status: 'cart',
          total: 0,
        },
      });
    }

    const existingItem = await prisma.orderItem.findFirst({
      where: {
        orderId: cart.id,
        productId,
      },
    });

    let item;
    if (existingItem) {
      item = await prisma.orderItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      item = await prisma.orderItem.create({
        data: {
          orderId: cart.id,
          productId,
          quantity,
        },
      });
    }

    const cartItems = await prisma.orderItem.findMany({
      where: { orderId: cart.id },
      include: { product: true },
    });

    const newTotal = cartItems.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );

    await prisma.order.update({
      where: { id: cart.id },
      data: { total: newTotal },
    });

    const updatedCart = await prisma.order.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Error in POST /api/cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
