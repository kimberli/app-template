import type {
  GetSettingsResponse,
  UpdateSettingsRequest,
  UpdateSettingsResponse,
} from "@app/schemas/v1/user/settings";
import type { UpdateUsernameResponse } from "@app/schemas/v1/user/username";
import { createContext, useContext } from "react";

export type SettingsContextType = {
  username: string;
  refreshProfile: () => Promise<void>;
  changeUsername: (username: string) => Promise<UpdateUsernameResponse | void>;
  settings?: GetSettingsResponse;
  updateSettings: (
    field: keyof UpdateSettingsRequest,
    value: UpdateSettingsRequest[keyof UpdateSettingsRequest],
  ) => Promise<UpdateSettingsResponse | void>;
};

export const SettingsContext = createContext<SettingsContextType>({
  username: "",
  refreshProfile: () => Promise.resolve(),
  changeUsername: (_username: string) => Promise.resolve(),
  updateSettings: async () => {},
});

export const useSettings = (): SettingsContextType =>
  useContext(SettingsContext);
