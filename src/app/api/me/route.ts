import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.emailAddresses?.[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
