import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { utils, write } from 'xlsx';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Fetch all data with relations
  const users = await prisma.user.findMany({
    include: {
      assignments: { include: { variant: true, experiment: true } },
      events: true,
    },
  });
  const experiments = await prisma.experiment.findMany({
    include: { variants: true, assignments: true, events: true },
  });
  const events = await prisma.event.findMany({
    include: { user: true, variant: true, experiment: true },
  });

  // Flatten for Excel
  const eventData = events.map((e) => ({
    userId: e.userId,
    userEmail: e.user.email,
    experimentId: e.experimentId,
    experimentName: e.experiment.name,
    variantId: e.variantId,
    variantName: e.variant.name,
    eventType: e.eventType,
    metadata: JSON.stringify(e.metadata),
    createdAt: e.createdAt,
  }));

  // Create Excel file
  const wb = utils.book_new();
  utils.book_append_sheet(wb, utils.json_to_sheet(users), 'Users');
  utils.book_append_sheet(wb, utils.json_to_sheet(experiments), 'Experiments');
  utils.book_append_sheet(wb, utils.json_to_sheet(eventData), 'Events');

  const buffer = write(wb, { type: 'buffer', bookType: 'xlsx' });

  return new Response(buffer, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="ab_test_data.xlsx"',
    },
  });
}
