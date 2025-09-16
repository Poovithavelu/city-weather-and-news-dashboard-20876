module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#F59E0B',
        error: '#EF4444',
        background: '#f9fafb',
        surface: '#ffffff',
        text: '#111827'
      },
      gradientColorStops: {
        'ocean-gradient-start': 'rgba(59,130,246,0.1)',
        'ocean-gradient-end': 'rgba(249,250,251,1)'
      }
    }
  },
  plugins: []
};
