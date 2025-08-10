import "@app/globals.css";
import "@fontsource/noto-sans";

import Providers from "@app/providers";
import { cn } from "@app/utils/cn";
import React from "react";

type RootLayoutProps = React.PropsWithChildren;

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
}: RootLayoutProps) => {
  return (
    <Providers>
      <main className={cn("w-full h-dvh flex flex-col font-sans select-none")}>
        {children}
      </main>
    </Providers>
  );
};

export default RootLayout;
