import Stripe from "stripe";

// Placeholder prevents the SDK from throwing at import time when the key is
// absent (e.g. during build without secrets). Real calls require a valid key.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_missing", {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID!;

export async function createOrRetrieveCustomer(userId: string, email: string): Promise<string> {
  const { prisma } = await import("@/lib/db/prisma");

  const subscription = await prisma.subscription.findUnique({ where: { userId } });

  if (subscription?.stripeCustomerId) {
    return subscription.stripeCustomerId;
  }

  const customer = await stripe.customers.create({ email, metadata: { userId } });

  await prisma.subscription.upsert({
    where: { userId },
    update: { stripeCustomerId: customer.id },
    create: { userId, stripeCustomerId: customer.id },
  });

  return customer.id;
}
