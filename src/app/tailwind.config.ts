// eslint-disable-next-line no-restricted-imports
import { heroui } from "@heroui/react";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

import {
  darkSurface,
  gray,
  lightSurface,
  surface,
  themeColors,
} from "./utils/colors";

const config: Config = {
  content: [
    "./index.html",
    "./main.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans-default)", "sans-serif"],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-quote-borders": gray[500],
            "--tw-prose-bullets": gray[500],
          },
        },
        invert: {
          css: {
            "--tw-prose-quote-borders": gray[500],
            "--tw-prose-bullets": gray[500],
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s forwards",
        "slide-out": "slide-out 0.3s forwards",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-out": {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    typography,
    heroui({
      layout: {
        boxShadow: {
          small: "0 0 0 1px rgba(0, 0, 0, 0.05)",
          medium: "0 0px 2px 1px rgba(0, 0, 0, 0.05)",
          large:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        },
        radius: {
          small: "0.25rem",
          medium: "0.25rem",
          large: "0.25rem",
        },
      },
      themes: {
        light: {
          colors: {
            background: {
              300: surface[15],
              400: surface[25],
              DEFAULT: surface[50],
              600: surface[75],
              700: surface[100],
            },
            focus: surface[200],
            foreground: darkSurface,
            default: {
              ...surface,
              foreground: darkSurface,
              DEFAULT: surface[200],
            },
            secondary: { ...gray, foreground: darkSurface, DEFAULT: gray[700] },
            divider: surface[100],
            content1: surface[25],
            content2: surface[200],
            content3: surface[200],
            content4: surface[300],
            ...themeColors,
          },
        },
        dark: {
          colors: {
            background: {
              300: surface[985],
              400: surface[975],
              DEFAULT: surface[950],
              600: surface[925],
              700: surface[900],
            },
            focus: surface[800],
            foreground: lightSurface,
            default: {
              ...surface,
              foreground: lightSurface,
              DEFAULT: surface[800],
            },
            secondary: {
              ...gray,
              foreground: lightSurface,
              DEFAULT: gray[300],
            },
            divider: surface[975],
            content1: surface[925],
            content2: surface[800],
            content3: surface[800],
            content4: surface[700],
            ...themeColors,
          },
        },
      },
    }),
  ],
};
export default config;
