import type { Category } from "@prisma/client";
import { prisma } from "./db";

export async function getCategories(): Promise<Category[]> {
  return await prisma.category.findMany({
    orderBy: { dateAdded: "desc" },
  });
}

export async function getCategory(id: string): Promise<Category> {
  return await prisma.category.findUnique({
    where: { id },
  });
}

export async function addCategory(category: Category): Promise<Category> {
  return await prisma.category.create({
    data: {
      name: category.name,
      description: category.description,
      User: { connect: { id: category.userId } },
    },
  });
}

export async function updateCategory(
  id: string,
  category: Category,
): Promise<Category> {
  return await prisma.category.update({
    where: { id },
    data: {
      name: category.name,
      description: category.description,
    },
  });
}

export async function deleteCategory(id: string): Promise<Category> {
  const product = await prisma.product.findMany({
    where: { categoryId: id },
  });

  if (product.length > 0) {
    throw new Error(
      `There are products attached to the category with id '${id}'. Please delete the products from the category.`,
    );
  }

  return await prisma.category.delete({
    where: { id },
  });
}
