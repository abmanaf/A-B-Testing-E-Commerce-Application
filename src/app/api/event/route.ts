import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { experimentId, eventType, metadata } = await request.json();
  const assignment = await prisma.assignment.findUnique({
    where: { userId_experimentId: { userId, experimentId } },
  });
  if (!assignment)
    return NextResponse.json({ error: 'No assignment' }, { status: 400 });

  const event = await prisma.event.create({
    data: {
      userId,
      variantId: assignment.variantId,
      experimentId,
      eventType,
      metadata,
    },
  });
  return NextResponse.json(event);
}
