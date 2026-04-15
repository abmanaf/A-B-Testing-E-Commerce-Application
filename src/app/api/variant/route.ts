import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, description, experimentId } = await request.json();
  const variant = await prisma.variant.create({
    data: { name, description, experimentId },
  });
  return NextResponse.json(variant);
}
