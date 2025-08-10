export interface AppLayoutSettings {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
}

export const DEFAULT_LAYOUT: AppLayoutSettings = {
  leftSidebarOpen: true,
  rightSidebarOpen: false,
};

export function updateLayoutSettings(settings: AppLayoutSettings): void {
  const existingSettings = localStorage.getItem("app_settings");
  if (existingSettings) {
    localStorage.setItem(
      "app_settings",
      JSON.stringify({ ...JSON.parse(existingSettings), ...settings }),
    );
  } else {
    localStorage.setItem("app_settings", JSON.stringify(settings));
  }
}

export function loadLayoutSettings(): AppLayoutSettings {
  if (typeof window !== "undefined") {
    const settings = localStorage.getItem("app_settings");
    if (!settings) {
      return DEFAULT_LAYOUT;
    }
    return { ...DEFAULT_LAYOUT, ...JSON.parse(settings) };
  }
  return DEFAULT_LAYOUT;
}

export function initializeTheme(): void {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("app_theme");
    if (
      storedTheme === "dark" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
}

export function setLightTheme(): void {
  localStorage.setItem("app_theme", "light");
  document.documentElement.classList.remove("dark");
}

export function setDarkTheme(): void {
  localStorage.setItem("app_theme", "dark");
  document.documentElement.classList.add("dark");
}

export function setSystemTheme(): void {
  localStorage.removeItem("app_theme");
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function clearTheme(): void {
  localStorage.removeItem("app_theme");
}

export function storeRootPage(page: string): void {
  localStorage.setItem("app_rootPage", page);
}

export function getStoredRootPage(): string | null {
  return localStorage.getItem("app_rootPage");
}
