import Button from "@app/components/ui/Button";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="h-[calc(100dvh-4rem)] relative flex flex-col justify-center gap-8">
        <div className="flex flex-col items-center justify-end">
          <h2 className="text-xl text-center">App template</h2>
        </div>
        <div className="flex justify-center">
          <Button href="/login" color="success" size="lg">
            Get started now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
