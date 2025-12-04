import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", md: "1.5rem" },
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      boxShadow: {
        'marketing-xl': '0 10px 30px -10px rgba(0,0,0,0.35)',
        'marketing-2xl': '0 25px 60px -12px rgba(0,0,0,0.4)',
        card: '0 8px 30px rgba(0,0,0,.12)',
        soft: '0 4px 16px rgba(0,0,0,.08)',
        glow: '0 0 0 4px rgba(107,207,207,.22)'
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          DEFAULT: '#04163a',
          primary: '#04163a',
          accent: '#2b7a78',
          soft: '#6bcfcf',
          secondary: '#6bcfcf',
          white: '#ffffff'
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.2,.8,.2,1)'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;


