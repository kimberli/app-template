import AppPage from "@app/components/AppPage";
import Spinner from "@app/components/ui/Spinner";
import { useSettings } from "@app/providers/Settings";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { settings } = useSettings();

  return settings ? (
    <div className="flex flex-row h-full w-full">
      <div className="flex-1 overflow-y-auto">
        <AppPage enforceAuth={true}>{children}</AppPage>
      </div>
    </div>
  ) : (
    <div className="h-dvh">
      <Spinner centered />
    </div>
  );
};

export default MainLayout;
