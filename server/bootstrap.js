require('ignore-styles');

require('babel-register')({
    ignore: [ /(node_modules)/ ],
    presets: ['es2015', 'react'],
    plugins: ["babel-plugin-styled-components"]
});

require('./index');
