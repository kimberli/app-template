import { addToast } from "@app/components/ui/Toast";
import { useUser } from "@app/providers/User";
import { ColorScheme } from "@app/schemas/db";
import type { GetUserResponse } from "@app/schemas/v1/user";
import type {
  GetSettingsResponse,
  UpdateSettingsRequest,
  UpdateSettingsResponse,
} from "@app/schemas/v1/user/settings";
import { type UpdateUsernameResponse } from "@app/schemas/v1/user/username";
import { authenticatedFetch, handleAPIResponse } from "@app/utils/api";
import {
  initializeTheme,
  setDarkTheme,
  setLightTheme,
  setSystemTheme,
} from "@app/utils/displayStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import posthog from "posthog-js";
import React, { useEffect } from "react";

import { SettingsContext } from ".";

interface SettingsProviderProps {
  children: React.ReactNode;
}

enum SettingsQueryKeys {
  USER = "userProfile",
  SETTINGS = "settings",
}

const fetchProfile = async (): Promise<GetUserResponse> => {
  const response = await authenticatedFetch("/api/v1/user", {
    method: "GET",
  });
  return handleAPIResponse<GetUserResponse>(response);
};

const fetchSettings = async (): Promise<GetSettingsResponse> => {
  const response = await authenticatedFetch("/api/v1/user/settings", {
    method: "GET",
  });
  return handleAPIResponse<GetSettingsResponse>(response);
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}: SettingsProviderProps): React.ReactNode => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: currentProfile, refetch: loadProfile } =
    useQuery<GetUserResponse>({
      queryKey: [SettingsQueryKeys.USER],
      queryFn: fetchProfile,
      retry: 1,
      enabled: !!user.id,
    });

  const { data: currentSettings, refetch: loadSettings } =
    useQuery<GetSettingsResponse>({
      queryKey: [SettingsQueryKeys.SETTINGS],
      queryFn: fetchSettings,
      retry: 1,
      enabled: !!user.id,
    });

  const changeUsernameMutation = useMutation({
    mutationFn: async (username: string) => {
      const response = await authenticatedFetch("/api/v1/user/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, username: username }),
      });
      return handleAPIResponse<UpdateUsernameResponse>(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SettingsQueryKeys.USER] });
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Failed to update username",
        color: "danger",
      });
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (payload: {
      field: keyof UpdateSettingsRequest;
      value: UpdateSettingsRequest[keyof UpdateSettingsRequest];
    }) => {
      const response = await authenticatedFetch("/api/v1/user/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [payload.field]: payload.value }),
      });
      return handleAPIResponse<UpdateSettingsResponse>(response);
    },
    onSuccess: (result) => {
      queryClient.setQueryData<GetSettingsResponse>(
        [SettingsQueryKeys.SETTINGS],
        (oldData: GetSettingsResponse | undefined) => {
          return oldData ? { ...oldData, ...result } : undefined;
        },
      );
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Failed to update settings",
        color: "danger",
      });
    },
  });

  useEffect(() => {
    if (user.id) {
      loadProfile();
      loadSettings();
    }
    initializeTheme();
  }, [user.id, loadSettings, loadProfile]);

  useEffect(() => {
    if (currentSettings?.colorScheme) {
      if (currentSettings.colorScheme === ColorScheme.AUTO) {
        setSystemTheme();
      } else if (currentSettings.colorScheme === ColorScheme.LIGHT) {
        setLightTheme();
      } else if (currentSettings.colorScheme === ColorScheme.DARK) {
        setDarkTheme();
      }
    }
  }, [currentSettings?.colorScheme]);

  useEffect(() => {
    if (!currentSettings) {
      return;
    }
    if (user.id && currentProfile?.username) {
      posthog.opt_in_capturing();
      posthog.identify(user.id, {
        username: currentProfile.username,
        email: user.email,
      });
    } else {
      posthog.opt_out_capturing();
    }
  }, [user.id, currentProfile?.username]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeUsername = async (
    username: string,
  ): Promise<UpdateUsernameResponse | void> => {
    return changeUsernameMutation.mutateAsync(username);
  };

  const updateSettings = async (
    field: keyof UpdateSettingsRequest,
    value: UpdateSettingsRequest[keyof UpdateSettingsRequest],
  ): Promise<UpdateSettingsResponse | void> => {
    if (!currentSettings) {
      return;
    }
    return updateSettingsMutation.mutateAsync({ field, value });
  };

  const refreshProfile = async (): Promise<void> => {
    await loadProfile();
  };

  return (
    <SettingsContext.Provider
      value={{
        username: currentProfile?.username ?? "",
        refreshProfile,
        changeUsername,
        settings: currentSettings,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
