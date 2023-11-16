/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#18283b',
        primaryhover: '#151e28',
        secondary: '#989595',
        thirdcolor: '#2c3e50',
        success: '#0f766e',
        danger: '#dc3545',
        light: '#f0f0f1',
        info: '#6b7280',
        warning: '#ff8819',
        pink: '#d63384',
        dark: '#1f2937'
      }
    }
  },
  plugins: []
}
