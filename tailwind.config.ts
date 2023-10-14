import type { Config } from 'tailwindcss'
import { tasksColors } from './src/utils/constants';

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'task-red',
    'task-blue',
    'task-yellow',
    'task-green'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6665DD',
        'secondary': '#9B9ECE',
        'detail': '#ACADBC'
      },
    },
  },
  plugins: [],
}
export default config
