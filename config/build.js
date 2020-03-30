const appEntry = require('./mutipageConfig');
const webpack = require('webpack');
console.log('building...');
for (var page in appEntry) {
    webpack(appEntry[page].clientConfig, (err)=>{
      if (err) throw err
    });
    webpack(appEntry[page].serverConfig, (err)=>{
      if (err) throw err
    });
}