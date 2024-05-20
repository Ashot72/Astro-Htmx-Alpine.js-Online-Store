import crypto from "node:crypto";
import type { User } from "@prisma/client";
import { prisma } from "./db";

export async function userExsist(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return Boolean(user);
}

export async function createUser(
  email: string,
  password: string,
): Promise<User> {
  let salt = crypto.randomBytes(16).toString("hex");
  let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString(
    "hex",
  );

  return prisma.user.create({
    data: {
      email,
      Password: { create: { hash, salt } },
    },
  });
}

export async function getUserEmail(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user ? user.email : null;
}

export async function login(
  email: string,
  password: string,
): Promise<boolean | string> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { Password: true },
  });

  if (!user || !user.Password) {
    return false;
  }

  const hash = crypto.pbkdf2Sync(
    password,
    user.Password.salt,
    1000,
    64,
    "sha256",
  ).toString("hex");

  if (hash !== user.Password.hash) {
    return false;
  }

  return user.id;
}
