import { apiDoc, describeRoute } from "@app/api/utils/api";
import { PublicResponseSchema } from "@app/schemas/v1/public";
import { Hono } from "hono";

// eslint-disable-next-line @local/eslint-local-rules/api-validation
const publicRouter = new Hono().get(
  "/",
  describeRoute(apiDoc("get", null, PublicResponseSchema)),
  async (c) => {
    return c.json(PublicResponseSchema.parse({ message: "Public route" }));
  },
);

export { publicRouter };
