import { HeroUIProvider, ToastProvider } from "@heroui/react"; // eslint-disable-line no-restricted-imports
import React, { PropsWithChildren } from "react";

import { AppLayoutProvider } from "./AppLayout/provider";
import { CacheProvider } from "./Cache/provider";
import { ClientProviders } from "./ClientProviders";
import { SettingsProvider } from "./Settings/provider";
import { useUser } from "./User";

const AuthenticatedProviders: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const { user } = useUser();
  return user?.id ? (
    <SettingsProvider>
      <CacheProvider>{children}</CacheProvider>
    </SettingsProvider>
  ) : (
    children
  );
};

const Providers: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return (
    <ClientProviders>
      <HeroUIProvider>
        <ToastProvider />
        <AppLayoutProvider>
          <AuthenticatedProviders>{children}</AuthenticatedProviders>
        </AppLayoutProvider>
      </HeroUIProvider>
    </ClientProviders>
  );
};

export default Providers;
