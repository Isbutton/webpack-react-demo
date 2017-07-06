var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
var TEM_PATH = path.resolve(ROOT_PATH,'templates');
var publicPath = 'http://127.0.0.1:3000/';

module.exports = {
    entry : {
        app:[
            'webpack-dev-server/client?http://127.0.0.1:3000',//react-hot-loader用
            'webpack/hot/only-dev-server',//react-hot-loader用
            path.resolve(APP_PATH,'index.jsx')
        ],
        // vendors:['jquery','moment'],
    },
    output :{
        path:BUILD_PATH,
        filename:'[name].js',
        publicPath: publicPath
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                loaders:['style-loader','css-loader','sass-loader'],
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader?limit=40000'
            },
            {
                test:/\.(jsx|js)$/,
                loader:['babel-loader'],
                include:APP_PATH,
            },
            {
                test:/\.(jsx|js)$/,
                enforce:'pre',
                include: APP_PATH,
                exclude:/node_modules/,
                use:{
                    loader:'jshint-loader',
                    options:{
                        camelcase: true,
                        emitErrors: false,
                        failOnHint: false,
                        reporter: function(errors) { },
                        'esversion':6
                    }
                }
            }
        ],
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({minimize:true}),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'vendors',
        //     filename:'vendors.js'
        // }),
        new HtmlwebpackPlugin({
            title :'react web',
            template : path.resolve(TEM_PATH,'index.html'),
            filename:'index.html',
            //chunks 引用entry里的那几个入口
            inject:'body'
        }),
        new webpack.HotModuleReplacementPlugin(),//react-hot-loader用
        new webpack.NoEmitOnErrorsPlugin(),//react-hot-loader用
        new webpack.NamedModulesPlugin()//会打印更新的模块名
    ],
    devtool: 'eval-source-map',
    resolve:{
        extensions:['.js','.jsx']
    }
};