import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

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

    // Get unique customers
    const customerIds = [...new Set(orders.map((o) => o.userId))];

    // Get products count
    const productsCount = await prisma.product.count();

    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Get recent orders (last 10)
    const recentOrders = orders.slice(0, 10);

    return NextResponse.json({
      totalRevenue,
      totalOrders: orders.length,
      totalProducts: productsCount,
      totalCustomers: customerIds.length,
      recentOrders,
    });
  } catch (error) {
    console.error('Error in GET /api/admin/stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
