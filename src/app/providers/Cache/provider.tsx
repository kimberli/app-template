import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";

import { CacheContext, CacheContextType } from "./";

type CacheProviderProps = React.PropsWithChildren;

export const CacheProvider: React.FC<CacheProviderProps> = ({
  children,
}: CacheProviderProps): React.ReactNode => {
  const queryClient = useQueryClient();

  const invalidateCache = useCallback(() => {
    queryClient.invalidateQueries();
  }, [queryClient]);

  const contextValue: CacheContextType = {
    invalidateCache,
  };

  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
};
