module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    
    files: [
      'src/utils/validarRut.js',  // Archivos específicos a medir
      'src/utils/scriptCarrito.js',
      'test/**/*.test.js'         // Todos los tests
    ],
    
    preprocessors: {
      'src/utils/*.js': ['webpack', 'coverage'],
      'test/**/*.test.js': ['webpack']
    },
    
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
    },
    
    reporters: ['progress', 'coverage'],
    
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ]
    },
    
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};