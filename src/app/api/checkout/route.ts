import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

interface CartItem {
  eventName: string;
  clubName: string;
  date: string;
  tierName: string;
  tierId: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customerEmail, customerName } = body as {
      items: CartItem[];
      customerEmail: string;
      customerName: string;
    };

    if (!items?.length) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    if (!customerEmail || !customerName) {
      return NextResponse.json({ error: "Customer details required" }, { status: 400 });
    }

    // Calculate total in cents (Stripe uses smallest currency unit)
    const totalCents = items.reduce(
      (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
      0
    );

    if (totalCents <= 0) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 });
    }

    // Build line items description for Stripe metadata
    const description = items
      .map((item) => `${item.quantity}x ${item.tierName} — ${item.eventName} @ ${item.clubName}`)
      .join(", ");

    // Create Stripe PaymentIntent
    const stripe = getStripeClient();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      description,
      receipt_email: customerEmail,
      metadata: {
        customerName,
        customerEmail,
        itemCount: String(items.length),
        items: JSON.stringify(
          items.map((i) => ({
            event: i.eventName,
            tier: i.tierName,
            qty: i.quantity,
            price: i.price,
          }))
        ).slice(0, 500), // Stripe metadata max 500 chars per value
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: unknown) {
    console.error("Checkout API error:", error);
    const message = error instanceof Error ? error.message : "Payment failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
