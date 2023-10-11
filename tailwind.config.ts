import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'nord-bg': 'url("../public/kittyboard.png")',
      },
      colors: {
        bkg: '#F3FCF0',
        content: '#1F271B',
        tomato: '#FF6347',
        nordWhite: '#E5E9F0',
        'persian-green': '#2A9D8F',
        'battleship-gray': '#82816D',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
