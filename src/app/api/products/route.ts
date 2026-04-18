import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { name, description, price, imageUrl, categoryId } =
    await request.json();

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl,
      categoryId,
    },
  });

  return NextResponse.json(product);
}
