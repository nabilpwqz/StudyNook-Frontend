/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",      // Bright orange
        secondary: "#FFF7ED",    // Soft warm background
        accent: "#F59E0B",       // Amber accent
        dark: "#1A1A1A",         // Dark charcoal
        light: "#FFF7ED",        // Light warm background
        success: "#16A34A",      // Green success
        error: "#DC2626",        // Muted red
        border: "#FDE8CF",       // Warm gray border
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      spacing: {
        "8px": "0.5rem",
        "16px": "1rem",
        "24px": "1.5rem",
        "32px": "2rem",
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
