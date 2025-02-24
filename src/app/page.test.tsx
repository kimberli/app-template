import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import Page from "../app/page";

it("renders homepage text", () => {
  const { container } = render(<Page />);
  expect(container).toHaveTextContent("Welcome to my app!");
});
