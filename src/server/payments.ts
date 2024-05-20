import type { Payment } from "@prisma/client";
import { stripe } from "./stripe";
import { prisma } from "./db";

export async function getUserPayments(userId: string): Promise<Payment[]> {
  return await prisma.payment.findMany({
    where: { userId },
    orderBy: { dateAdded: "desc" },
  });
}

export async function addPayments(
  userId: string,
  token: string,
  total: number,
): Promise<Payment> {
  return await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({ where: { userId } });

    if (!cart) {
      throw new Error("No cart items.");
    }

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: +(total * 100).toFixed(),
      source: token,
    });

    const payment = await tx.payment.create({
      data: {
        stripeId: charge.id,
        products: cart.products,
        User: { connect: { id: userId } },
      },
    });

    await tx.cart.delete({
      where: { userId },
    });

    return payment;
  }, {
    maxWait: 5000,
    timeout: 10000,
  });
}
