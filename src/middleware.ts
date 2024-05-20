import { defineMiddleware } from "astro:middleware";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const onRequest = defineMiddleware((context, next) => {
  try {
    const token = context.cookies.get("online-store")?.value;

    if (token) {
      const payload = jwt.verify(token, import.meta.env.JWT_SECRET);
      context.locals.userId = (payload as JwtPayload).id;
    }
  } catch (_) {}
  next();
});
