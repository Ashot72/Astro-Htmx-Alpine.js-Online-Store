import type { Cart } from "@prisma/client";
import { prisma } from "./db";

export async function getUserCart(userId: string): Promise<Cart> {
  return await prisma.cart.findFirst({ where: { userId } });
}

export async function addToCart(id: string, userId: string): Promise<Cart> {
  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id } });

    if (!product) {
      throw new Error("Failed to get the prodct to add to cart");
    }

    const cart = await getUserCart(userId);

    if (cart) {
      let existingProduct = cart.products.find((p) => p.id === id);
      if (existingProduct) {
        existingProduct.qty += 1;

        return await tx.cart.update({
          where: { userId },
          data: {
            products: cart.products,
          },
        });
      } else {
        return await tx.cart.update({
          where: { userId },
          data: {
            products: [
              ...cart.products,
              {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                picture: product.picture,
                qty: 1,
              },
            ],
          },
        });
      }
    } else {
      return await tx.cart.create({
        data: {
          products: [{
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            picture: product.picture,
            qty: 1,
          }],
          User: { connect: { id: userId } },
        },
      });
    }
  }, {
    maxWait: 5000,
    timeout: 10000,
  });
}

export async function addOrRemove(
  id: string,
  userId: string,
  shouldAdd: boolean,
): Promise<Cart> {
  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id } });

    if (!product) {
      throw new Error("Failed to get the product to add or remove.");
    }

    const cart = await getUserCart(userId);

    if (cart) {
      let existingProduct = cart.products.find((p) => p.id === id);
      if (existingProduct) {
        shouldAdd ? existingProduct.qty += 1 : existingProduct.qty -= 1;

        if (existingProduct.qty === 0) {
          if (cart.products.length === 1) {
            return await tx.cart.delete({
              where: { userId },
            });
          } else {
            let otherProducts = cart.products.filter((p) => p.id !== id);

            return await tx.cart.update({
              where: { userId },
              data: {
                products: otherProducts,
              },
            });
          }
        } else {
          return await tx.cart.update({
            where: { userId },
            data: {
              products: cart.products,
            },
          });
        }
      }
    } else {
      throw new Error("Cart not found.");
    }
  }, {
    maxWait: 5000,
    timeout: 10000,
  });
}

export async function removeAll(id: string, userId: string): Promise<Cart> {
  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id } });

    if (!product) {
      throw new Error("Failed to get the product to delete.");
    }

    const cart = await getUserCart(userId);

    if (cart) {
      if (cart.products.length === 1) {
        return await tx.cart.delete({
          where: { userId },
        });
      } else {
        let otherProducts = cart.products.filter((p) => p.id !== id);

        return await tx.cart.update({
          where: { userId },
          data: {
            products: otherProducts,
          },
        });
      }
    } else {
      throw new Error("Cart not found.");
    }
  }, {
    maxWait: 5000,
    timeout: 10000,
  });
}
