import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: 'Poppins, sans-serif',
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  plugins: [],
}
