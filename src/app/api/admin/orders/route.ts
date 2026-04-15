import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// GET /api/admin/orders - Get all orders
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    if (ADMIN_EMAIL) {
      const user = await currentUser();
      const email = user?.emailAddresses?.[0]?.emailAddress;

      if (email !== ADMIN_EMAIL) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const orders = await prisma.order.findMany({
      where: {
        status: { not: 'cart' },
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format orders for response
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      user: {
        email: order.user?.email || null,
      },
      shippingAddress: order.shippingAddress,
      shippingPhone: order.shippingPhone,
      shippingFirstName: order.shippingFirstName,
      shippingLastName: order.shippingLastName,
      items: order.items.map((item) => ({
        product: {
          name: item.product.name,
        },
        quantity: item.quantity,
        price: item.product.price,
      })),
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error in GET /api/admin/orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/orders - Update order status
export async function PATCH(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId, status } = await request.json();

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error in PATCH /api/admin/orders:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
