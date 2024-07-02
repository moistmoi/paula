module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle, rgba(28,23,98,1) 0%, rgba(0,0,0,1) 100%)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
