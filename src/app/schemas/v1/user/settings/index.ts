import "zod-openapi/extend";

import { ColorScheme } from "@app/schemas/db";
import { z } from "zod";

export const SettingsSchema = z.object({
  colorScheme: z.nativeEnum(ColorScheme).describe("Color scheme to display."),
});

export const UpdateableSettingsSchema = SettingsSchema.strict().partial();

export const GetSettingsRequestSchema = z.object({});
export type GetSettingsRequest = z.infer<typeof GetSettingsRequestSchema>;

export const GetSettingsResponseSchema = SettingsSchema;
export type GetSettingsResponse = z.infer<typeof GetSettingsResponseSchema>;

export const UpdateSettingsRequestSchema = UpdateableSettingsSchema;
export type UpdateSettingsRequest = z.infer<typeof UpdateSettingsRequestSchema>;
export const UpdateSettingsResponseSchema = UpdateableSettingsSchema;
export type UpdateSettingsResponse = z.infer<
  typeof UpdateSettingsResponseSchema
>;
