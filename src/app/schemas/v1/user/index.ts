import "zod-openapi/extend";

import { z } from "zod";

export const GetUserResponseSchema = z.object({
  username: z.string(),
});

export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;
