import "zod-openapi/extend";

import { z } from "zod";

export const PublicResponseSchema = z.object({
  message: z.string(),
});

export type PublicResponse = z.infer<typeof PublicResponseSchema>;
