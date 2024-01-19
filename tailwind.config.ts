import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        mobileMax: {min: "320px" , max: "767px"},
        tabletMax: { min: "768px", max: "1023px" },
        laptopMax: { min: "1024px", max: "1279px" }, 
      },
      colors:{
        primary:"#2BD17E",
        error:"#EB5757",
        background:"#093545",
        input:"#224957",
        card:"#092C39"
      }
    },
  },
  plugins: [],
}
export default config
