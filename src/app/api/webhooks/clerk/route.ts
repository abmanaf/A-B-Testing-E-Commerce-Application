import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { assignVariant } from '@/utils'

export async function POST(request: Request) {

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Webhook secret not found' },
      { status: 500 }
    )
  }

  const headerPayload  = await headers()
  const svix_id        = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 400 }
    )
  }

  const payload = await request.json()
  const body    = JSON.stringify(payload)
  const wh      = new Webhook(WEBHOOK_SECRET)

  let evt: any

  try {
    evt = wh.verify(body, {
      'svix-id':        svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 400 }
    )
  }

  const { type, data } = evt

  switch (type) {
    case 'user.created':
      const email = data.email_addresses?.[0]?.email_address

      if (!email) {
        console.log('No email, skipping')
        break
      }

      try {
        // 1. Save user to Neon
        const newUser = await prisma.user.create({
          data: {
            id:    data.id,
            email: email,
          }
        })
        console.log('✅ User saved:', newUser.id)

        // 2. Assign Homepage Experiment FIRST
        const homepageExperimentId = process.env.HOMEPAGE_EXPERIMENT_ID!  // ← no NEXT_PUBLIC_
        console.log('🔍 Homepage experiment ID:', homepageExperimentId)

        const homepageVariants = await prisma.variant.findMany({
          where: { experimentId: homepageExperimentId }
        })
        console.log('🔍 Homepage variants found:', homepageVariants.length)

        if (homepageVariants.length > 0) {
          const homepageVariant = assignVariant(data.id, homepageExperimentId, homepageVariants)
          await prisma.assignment.create({
            data: {
              userId:       data.id,
              variantId:    homepageVariant.id,
              experimentId: homepageExperimentId,
            }
          })
          console.log('✅ Homepage assignment - Variant:', homepageVariant.name)
        }

        // 3. Assign Product Experiment SECOND
        const productExperimentId = process.env.PRODUCT_EXPERIMENT_ID!  // ← no NEXT_PUBLIC_
        console.log('🔍 Product experiment ID:', productExperimentId)

        const productVariants = await prisma.variant.findMany({
          where: { experimentId: productExperimentId }
        })
        console.log('🔍 Product variants found:', productVariants.length)

        if (productVariants.length > 0) {
          const productVariant = assignVariant(data.id, productExperimentId, productVariants)
          await prisma.assignment.create({
            data: {
              userId:       data.id,
              variantId:    productVariant.id,
              experimentId: productExperimentId,
            }
          })
          console.log('✅ Product assignment - Variant:', productVariant.name)
        }

      } catch (err: any) {
        console.error('❌ Error message:', err.message)
        console.error('❌ Error code:', err.code)
        console.error('❌ Error meta:', JSON.stringify(err.meta))
      }
      break

    case 'user.updated':
      const updatedEmail = data.email_addresses?.[0]?.email_address

      if (!updatedEmail) {
        console.log('No email, skipping')
        break
      }

      await prisma.user.update({
        where: { id: data.id },
        data:  { email: updatedEmail }
      })
      console.log('✅ User updated:', data.id)
      break

    case 'user.deleted':
      await prisma.user.delete({
        where: { id: data.id }
      })
      console.log('✅ User deleted:', data.id)
      break

    default:
      console.log('Unhandled event:', type)
  }

  return NextResponse.json({ success: true })
}