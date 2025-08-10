import React, { useEffect } from "react";

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = `App - Home`;
  }, []);

  return (
    <div className="flex-1 w-full h-full flex flex-col p-2">
      <h1>Home</h1>
    </div>
  );
};

export default HomePage;
