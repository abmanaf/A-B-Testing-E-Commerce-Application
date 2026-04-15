import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { products: true }
  })
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, description } = await request.json()
  
  const category = await prisma.category.create({
    data: {
      name,
      description
    }
  })

  return NextResponse.json(category)
}