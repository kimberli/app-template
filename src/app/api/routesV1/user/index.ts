import { eq, sql } from "@app/api/db";
import { profiles } from "@app/api/db/schema";
import { userSettingsRouter } from "@app/api/routesV1/user/settings";
import { apiDoc, describeRoute } from "@app/api/utils/api";
import { EnvBindings } from "@app/api/utils/env";
import { GetUserResponseSchema } from "@app/schemas/v1/user";
import { Hono } from "hono";

import { userUsernameRouter } from "./username";

// eslint-disable-next-line @local/eslint-local-rules/api-validation
const userRouter = new Hono<EnvBindings>().get(
  "/",
  describeRoute(apiDoc("get", null, GetUserResponseSchema)),
  async (c) => {
    const log = c.get("log");
    const userId = c.get("userId");
    const db = c.get("db");
    const profile = await db
      .select({
        username: profiles.username,
      })
      .from(profiles)
      .where(eq(profiles.userId, sql`CAST(${userId} AS uuid)`))
      .limit(1);

    if (!profile || profile.length === 0) {
      log.error("Unexpected profile missing for user", { userId });
      return c.json({ error: "Profile not found" }, { status: 404 });
    }

    const response = GetUserResponseSchema.parse({
      username: profile[0].username,
    });

    return c.json(response);
  },
);

userRouter.route("/settings", userSettingsRouter);
userRouter.route("/username", userUsernameRouter);

export { userRouter };
