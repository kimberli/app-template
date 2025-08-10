import { authMiddleware } from "@app/api/middleware/auth";
import { EnvBindings, EnvContext } from "@app/api/utils/env";
import { Hono } from "hono";

import { publicRouter } from "./public";
import { userRouter } from "./user";

const v1Router = new Hono<EnvBindings>();
v1Router.use("*", async (c: EnvContext, next) => {
  const path = new URL(c.req.url).pathname;

  if (path.startsWith("/api/v1/public")) {
    c.set("authOptional", true);
    return authMiddleware(c, next);
  }

  return authMiddleware(c, next);
});

v1Router.route("public", publicRouter);
v1Router.route("user", userRouter);
v1Router.use("*", async (c: EnvContext) => {
  return c.json({ error: "Not found" }, 404);
});

export { v1Router };
