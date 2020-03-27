const appEntry = require('./mutipageConfig');
const webpack = require('webpack');
console.log('building...');
for (var page in appEntry) {
    webpack(appEntry[page].clientConfig, ()=>{});
    webpack(appEntry[page].serverConfig, ()=>{});
}