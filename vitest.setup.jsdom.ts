import "@testing-library/jest-dom";

import * as React from "react";
import { vi } from "vitest";

global.React = React;

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(),
  })),
  usePathname: vi.fn(() => "/"),
}));
