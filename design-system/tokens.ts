export type DesignTokens = {
  colors: {
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    background: string
    foreground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
  }
  sidebar: {
    background: string
    foreground: string
    primary: string
    primaryForeground: string
    accent: string
    accentForeground: string
    border: string
    ring: string
  }
  radius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    "2xl": string
  }
  typography: {
    fontSans: string
    fontMono: string
    sizeXs: string
    sizeSm: string
    sizeMd: string
    sizeLg: string
    sizeXl: string
    size2xl: string
    size3xl: string
    size4xl: string
    weightNormal: string
    weightMedium: string
    weightSemibold: string
    weightBold: string
  }
}

export const tokens: DesignTokens = {
  colors: {
    primary: "#3B6D11",
    primaryForeground: "#FFFFFF",
    secondary: "#639922",
    secondaryForeground: "#FFFFFF",
    background: "#FFFFFF",
    foreground: "#2C2C2A",
    muted: "#F5F5F3",
    mutedForeground: "#6B6B68",
    accent: "#639922",
    accentForeground: "#FFFFFF",
    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",
    border: "#E5E5E3",
    input: "#E5E5E3",
    ring: "#3B6D11",
    card: "#FFFFFF",
    cardForeground: "#2C2C2A",
    popover: "#FFFFFF",
    popoverForeground: "#2C2C2A",
  },
  sidebar: {
    background: "#2D5209",
    foreground: "#F0F5EB",
    primary: "#639922",
    primaryForeground: "#FFFFFF",
    accent: "#3B6D11",
    accentForeground: "#F0F5EB",
    border: "#4A7A18",
    ring: "#639922",
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  typography: {
    fontSans: "var(--font-geist-sans), system-ui, sans-serif",
    fontMono: "var(--font-geist-mono), monospace",
    sizeXs: "0.75rem",
    sizeSm: "0.875rem",
    sizeMd: "1rem",
    sizeLg: "1.125rem",
    sizeXl: "1.25rem",
    size2xl: "1.5rem",
    size3xl: "1.875rem",
    size4xl: "2.25rem",
    weightNormal: "400",
    weightMedium: "500",
    weightSemibold: "600",
    weightBold: "700",
  },
}
