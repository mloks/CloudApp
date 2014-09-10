module.exports = function(config) {

  config.set({

    files: [
      'dist/scripts/main.js',
      'app/client/components/angular-mocks/angular-mocks.js',
      'app/public/scripts/specs.js'
    ],

    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['Chrome'],

    port: 9870,
    colors: true

  });

};