import { createContext, useContext } from "react";

export type CacheContextType = {
  invalidateCache: () => void;
};

export const CacheContext = createContext<CacheContextType>({
  invalidateCache: () => {},
});

export const useCache = (): CacheContextType => useContext(CacheContext);
