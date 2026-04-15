import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// PUT /api/cart/[id] - Update item quantity
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: itemId } = await params;
    const { quantity } = await request.json();

    // Find the cart item and verify ownership
    const item = await prisma.orderItem.findUnique({
      where: { id: itemId },
      include: {
        order: true,
      },
    });

    if (!item || item.order.userId !== userId) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await prisma.orderItem.delete({ where: { id: itemId } });
    } else {
      await prisma.orderItem.update({
        where: { id: itemId },
        data: { quantity },
      });
    }

    // Recalculate cart total
    const cartItems = await prisma.orderItem.findMany({
      where: { orderId: item.orderId },
      include: { product: true },
    });

    const newTotal = cartItems.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );

    await prisma.order.update({
      where: { id: item.orderId },
      data: { total: newTotal },
    });

    // Return updated cart
    const cart = await prisma.order.findUnique({
      where: { id: item.orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error in PUT /api/cart/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/[id] - Remove item from cart
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: itemId } = await params;

    // Find the cart item and verify ownership
    const item = await prisma.orderItem.findUnique({
      where: { id: itemId },
      include: {
        order: true,
      },
    });

    if (!item || item.order.userId !== userId) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Delete the item
    await prisma.orderItem.delete({ where: { id: itemId } });

    // Recalculate cart total
    const cartItems = await prisma.orderItem.findMany({
      where: { orderId: item.orderId },
      include: { product: true },
    });

    const newTotal = cartItems.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );

    await prisma.order.update({
      where: { id: item.orderId },
      data: { total: newTotal },
    });

    // Return updated cart
    const cart = await prisma.order.findUnique({
      where: { id: item.orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error in DELETE /api/cart/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
