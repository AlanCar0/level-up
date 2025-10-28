// karma.conf.js
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'], 
        files: [
            'src/utils/**/*.js',  // Incluir archivos de utilidades
            'test/**/*.js'        // Archivos de test
        ],
        exclude: [
            'src/**/*.jsx',       // Excluir componentes React
            'src/**/*.js'         // Excluir otros archivos JS de React
        ],
        browsers: ['ChromeHeadless'], 
        singleRun: true
    });
};