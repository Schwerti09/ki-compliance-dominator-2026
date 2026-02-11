/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/content/**/*.{md,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "2rem", lg: "4rem", xl: "5rem", "2xl": "6rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1400px" }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        success: { DEFAULT: "#00CC88", foreground: "#FFFFFF" },
        warning: { DEFAULT: "#FFAA00", foreground: "#000000" },
        danger: { DEFAULT: "#FF3B30", foreground: "#FFFFFF" },
        trust: { blue: "#0066FF", green: "#00CC88", purple: "#8B5CF6", cyan: "#00F0FF", amber: "#FFAA00" }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
      },
      animation: {
        gradient: "gradient 10s linear infinite",
        float: "float 6s ease-in-out infinite",
        stream: "stream 2.5s linear infinite",
        shimmer: "shimmer 2s infinite",
        "fade-up": "fadeUp .45s ease-out",
        "scale-in": "scaleIn .2s ease-out"
      },
      keyframes: {
        gradient: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-18px)" } },
        stream: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(100%)" } },
        shimmer: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(100%)" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { "0%": { opacity: "0", transform: "scale(.97)" }, "100%": { opacity: "1", transform: "scale(1)" } }
      },
      boxShadow: {
        glow: "0 0 25px rgba(59,130,246,.35)",
        "glow-success": "0 0 25px rgba(0,204,136,.35)",
        trust: "0 0 40px rgba(0,240,255,.18)"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    ({ addUtilities }) => {
      addUtilities({
        ".glass-effect": {
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.12)"
        },
        ".text-balance": { textWrap: "balance" },
        ".perspective-1000": { perspective: "1000px" },
        ".preserve-3d": { transformStyle: "preserve-3d" }
      });
    }
  ]
};
