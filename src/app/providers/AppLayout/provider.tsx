import {
  type AppLayoutSettings,
  DEFAULT_LAYOUT,
  getStoredRootPage,
  loadLayoutSettings,
  storeRootPage,
  updateLayoutSettings,
} from "@app/utils/displayStorage";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AppLayoutContext, SidebarKey } from ".";

interface AppLayoutProviderProps {
  children: React.ReactNode;
}

export const AppLayoutProvider: React.FC<AppLayoutProviderProps> = ({
  children,
}: AppLayoutProviderProps): React.ReactNode => {
  const [rootPage, setRootPage] = useState<SidebarKey>(SidebarKey.NONE);
  const [appLayout, setAppLayout] = useState<AppLayoutSettings>(DEFAULT_LAYOUT);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setAppLayout(loadLayoutSettings());
    const stored = getStoredRootPage();
    if (stored) {
      setRootPage(stored as SidebarKey);
    }
  }, []);

  const updateAppLayout = useCallback(
    (settings: Partial<AppLayoutSettings>): void => {
      setAppLayout((prevLayout) => {
        const newLayout = { ...prevLayout, ...settings };
        updateLayoutSettings(newLayout);
        return newLayout;
      });
    },
    [],
  );

  const updateRootPage = useCallback((page: SidebarKey): void => {
    setRootPage(page);
    storeRootPage(page);
  }, []);

  const navigateToRoot = useCallback(() => {
    if (!pathname.startsWith(rootPage) && rootPage !== SidebarKey.NONE) {
      navigate(rootPage);
    }
  }, [navigate, rootPage, pathname]);

  const contextValue = useMemo(() => {
    return {
      appLayout,
      updateAppLayout,
      updateRootPage,
      navigateToRoot,
    };
  }, [appLayout, updateAppLayout, updateRootPage, navigateToRoot]);

  return (
    <AppLayoutContext.Provider value={contextValue}>
      {children}
    </AppLayoutContext.Provider>
  );
};
