import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

import { AppPageContext } from "./";

export const AppPageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  return (
    <AppPageContext.Provider value={{ containerRef }}>
      <div id="app-page" className="relative w-full h-full overflow-x-hidden">
        <motion.div
          ref={containerRef}
          className="h-full p-2 overflow-y-auto grow"
          key={pathname}
          initial={{ opacity: 0.8, x: -2 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            scrollBehavior: "smooth",
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </AppPageContext.Provider>
  );
};
