import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createOrRetrieveCustomer, stripe, STRIPE_PRICE_ID } from "@/lib/stripe/client";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { origin } = new URL(req.url);
    const customerId = await createOrRetrieveCustomer(session.user.id, session.user.email);

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${origin}/dashboard?upgraded=true`,
      cancel_url: `${origin}/dashboard`,
      metadata: { userId: session.user.id },
    });

    return NextResponse.json({ success: true, data: { url: checkoutSession.url } });
  } catch (err) {
    console.error("[stripe/checkout]", err);
    return NextResponse.json({ success: false, error: "Failed to create checkout session" }, { status: 500 });
  }
}
