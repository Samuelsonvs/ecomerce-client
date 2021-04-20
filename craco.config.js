const path = require('path');
module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    devServer: {
      watchOptions: {
        ignored: [
          path.resolve(__dirname, 'dist'),
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'uploads') // image folder path
        ]
      }
    },
}