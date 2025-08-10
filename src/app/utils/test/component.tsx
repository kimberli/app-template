import { CacheProvider } from "@app/providers/Cache/provider";
import { SettingsProvider } from "@app/providers/Settings/provider";
import { UserProvider } from "@app/providers/User/provider";
import { ToastProvider } from "@heroui/react"; // eslint-disable-line no-restricted-imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const AllProviders = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <SettingsProvider>
            <ToastProvider />
            <CacheProvider>{children}</CacheProvider>
          </SettingsProvider>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
};
