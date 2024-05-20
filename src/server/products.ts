import type { Product } from "@prisma/client";
import { prisma } from "./db";

export async function getCategoryProducts(
  categoryId: string,
): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { categoryId },
    orderBy: { dateAdded: "desc" },
    include: {
      Category: true,
    },
  });
}

export async function getProduct(id: string): Promise<Product> {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function getUserProducts(
  categoryId: string,
  userId: string,
): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { categoryId, userId },
    orderBy: { dateAdded: "desc" },
    include: {
      Category: true,
    },
  });
}

export async function addProduct(
  product: Product,
  categoryId: string,
  userId: string,
): Promise<Product> {
  return await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      picture: product.picture,
      count: product.count,
      Category: { connect: { id: categoryId } },
      User: { connect: { id: userId } },
    },
  });
}

export async function updateProduct(
  id: string,
  product: Product,
): Promise<Product> {
  return await prisma.product.update({
    where: { id },
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      picture: product.picture,
      count: product.count,
      Category: { connect: { id: product.categoryId } },
    },
  });
}

export async function deleteProduct(id: string): Promise<Product> {
  return await prisma.product.delete({ where: { id } });
}

export async function getProductsBySearchTerm(
  term: string,
): Promise<Product[]> {
  return prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: term,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: term,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      Category: true,
      User: true,
    },
  });
}
