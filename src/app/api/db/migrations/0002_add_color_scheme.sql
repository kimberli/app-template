CREATE TYPE "public"."color_scheme" AS ENUM('auto', 'light', 'dark');--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "color_scheme" "color_scheme" DEFAULT 'auto' NOT NULL;