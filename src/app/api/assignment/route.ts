import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assignVariant } from '@/utils';

export async function POST(request: Request) {
  const { userId, experimentId } = await request.json();

  // Validate inputs
  if (!userId || !experimentId) {
    return NextResponse.json(
      { error: 'userId and experimentId are required' },
      { status: 400 }
    );
  }

  // Check if already assigned
  const existing = await prisma.assignment.findUnique({
    where: { userId_experimentId: { userId, experimentId } },
    include: { variant: true },
  });
  if (existing)
    return NextResponse.json({
      variantId: existing.variantId,
      variant: existing.variant,
    });

  // Get variants for experiment
  const variants = await prisma.variant.findMany({
    where: { experimentId },
  });

  if (!variants.length) {
    return NextResponse.json({ error: 'No variants found' }, { status: 400 });
  }

  const variant = assignVariant(userId, experimentId, variants);

  const assignment = await prisma.assignment.create({
    data: { userId, variantId: variant.id, experimentId },
    include: { variant: true },
  });

  return NextResponse.json({
    variantId: assignment.variantId,
    variant: assignment.variant,
  });
}
