/**
 * Created by qitmac000068 on 2017/7/5.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config),{
    publicPath:config.output.publicPath,
    hot:true,
    historyApiFallback:true,
    stats:{colors:true},
    headers:{
      'Access-Control-Allow-Origin':'*'
    },
    proxy:{//跨域可以用http-proxy-middleware
        '/test/*':{
            target:'http://127.0.0.1',
            changeOrigin:true,
            secure:false
        }
    }
}).listen(3000,'127.0.0.1',function(err,result){
    if(err) console.log(err);
    console.log('Listening at 127.0.0.1:3000');
});

