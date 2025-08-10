import { DbErrorCode } from "@app/api/db/errors";
import { supabaseMock } from "@app/api/lib/supabase/__mocks__/client";
import { EnvBindings } from "@app/api/utils/env";
import { DEFAULT_TEST_USER_ID, getRequest } from "@app/api/utils/test/api";
import { testDb } from "@app/api/utils/test/provider";
import fs from "fs";
import { Hono } from "hono";
import path from "path";
import { describe, expect, it, Mock, vi } from "vitest";

import { api } from "./index";

const makeAuthenticatedRequest = (
  app: Hono<EnvBindings>,
  route: string,
  userId: string,
  params: Record<string, string> = {},
): Promise<Response> => {
  (supabaseMock.auth.getUser as unknown as Mock).mockResolvedValue({
    data: {
      user: { id: userId, email: "user@example.com" },
    },
    error: null,
  });

  return getRequest(app, route, params, {
    Authorization: `Bearer MOCK_TOKEN`,
  });
};

describe("/api", () => {
  describe("GET /api/health", () => {
    it("should return 200", async () => {
      const response = await getRequest(api, "/api/health");
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual({ status: "ok" });
    });
  });

  describe("GET /api/openapi", () => {
    it("should return 200", async () => {
      const response = await getRequest(api, "/api/openapi");
      expect(response.status).toBe(200);
      const data: {
        openapi: string;
        info: { title: string; version: string; description: string };
        paths: Record<string, unknown>;
      } = await response.json();
      expect(data.openapi).toEqual("3.1.0");
      expect(data.info.title).toEqual("App API");
      expect(data.info.version).toEqual("1.0.0");
      expect(data.info.description).toEqual("App API");
    });

    it("should include all API routes", async () => {
      const response = await getRequest(api, "/api/openapi");
      expect(response.status).toBe(200);
      const data: {
        openapi: string;
        info: { title: string; version: string; description: string };
        paths: Record<string, unknown>;
      } = await response.json();

      const routes: string[] = [];
      const crawlDirectory = async (dir: string): Promise<void> => {
        const entries = await fs.promises.readdir(dir, { withFileTypes: true });

        // Check if this is a leaf directory (contains index.ts but no subdirectories with index.ts)
        const hasIndex = entries.some(
          (e) => e.isFile() && e.name === "index.ts",
        );
        const hasSubdirsWithIndex = entries.some(
          (e) =>
            e.isDirectory() &&
            fs.existsSync(path.join(dir, e.name, "index.ts")),
        );

        if (hasIndex && !hasSubdirsWithIndex) {
          const relativePath = path.relative("./api/routesV1", dir);
          const routePath = "/" + relativePath.replace(/\\/g, "/");
          routes.push(routePath);
        }

        // Continue crawling subdirectories
        for (const entry of entries) {
          if (entry.isDirectory()) {
            await crawlDirectory(path.join(dir, entry.name));
          }
        }
      };

      await crawlDirectory("./api/routesV1");

      // Verify each found route exists in the OpenAPI paths
      routes.forEach((route) => {
        expect(data.paths).toHaveProperty(`/api/v1${route}`);
      });
    });
  });

  describe("Protected routes", () => {
    it("should return 401 when unauthenticated", async () => {
      const response = await getRequest(api, "/api/v1/user");
      expect(response.status).toBe(401);
    });

    it("should return 200 when authenticated", async () => {
      const response = await makeAuthenticatedRequest(
        api,
        "/api/v1/user",
        DEFAULT_TEST_USER_ID,
      );
      expect(response.status).toBe(200);
    });

    it("should return 500 when authenticated but DB connection fails", async () => {
      vi.spyOn(testDb.db, "select").mockImplementationOnce(() => {
        throw { code: DbErrorCode.ConnectionFailure };
      });
      const response = await makeAuthenticatedRequest(
        api,
        "/api/v1/user",
        DEFAULT_TEST_USER_ID,
      );
      expect(response.status).toBe(500);
    });
  });

  describe("Public routes", () => {
    it("should return 200 when unauthenticated", async () => {
      const response = await getRequest(api, "/api/v1/public");
      expect(response.status).toBe(200);
    });

    it("should return 200 when authenticated", async () => {
      const response = await makeAuthenticatedRequest(
        api,
        "/api/v1/public",
        DEFAULT_TEST_USER_ID,
      );
      expect(response.status).toBe(200);
    });
  });
});
