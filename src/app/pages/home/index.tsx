import Button from "@app/components/ui/Button";
import Input from "@app/components/ui/Input";
import { useSettings } from "@app/providers/Settings";
import { useUser } from "@app/providers/User";
import React, { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const { username, changeUsername } = useSettings();
  const { handleLogout } = useUser();
  const [newUsername, setNewUsername] = useState<string>(username);

  useEffect(() => {
    document.title = `App - Home`;
  }, []);

  return (
    <div className="flex-1 w-full h-full flex flex-col p-2">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="flex flex-col max-w-sm gap-2">
        <p>Logged in as {username}</p>
        <div className="flex gap-2">
          <Input
            value={newUsername}
            label="New username"
            labelPlacement="outside-left"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewUsername(e.target.value);
            }}
          />
          <Button onPress={() => changeUsername(newUsername)}>Save</Button>
        </div>
        <Button
          onPress={() => {
            handleLogout();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
