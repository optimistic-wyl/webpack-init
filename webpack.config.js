const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

/*
************************
 产生Chunk的三种途径
    entry入口
    异步加载模块
    代码分割（code spliting）
*************************

*************************
    output.filename 决定了每个入口(entry) 输出 bundle 的名称。
    output.chunkFilename 决定了非入口(non-entry) chunk 文件的名称。
*************************

    首屏加载的JS资源地址是通过页面中的script标签来指定的，
    而间接资源（通过首屏JS再进一步加载的JS）的位置则要通过output.publicPath来指定,
    就是说非页面首次引用的资源通过output.publicPath指定，如动态加载的资源

*/
module.exports = {
    mode: 'development',
    entry: {
        first: "./src/first.js",
        second: './src/second.js',
    },
    output: {
        filename: "[name].[chunkhash:8].bundle.js", // 输出 index.js 和 utils.js
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 创建一个 link 标签
                    // 'style-loader', // 与MiniCssExtractPlugin互斥
                    'css-loader' // css-loader 负责解析 CSS 代码, 处理 CSS 中的依赖
                ],
            },
        ]
    },
    plugins: [
        // 用 MiniCssExtractPlugin 抽离出 css 文件，以 link 标签的形式引入样式文件
        new MiniCssExtractPlugin({
            filename: 'index.[contenthash:8].bundle.css' // 输出的 css 文件名为 index.css
        }),
        new HtmlWebpackPlugin({
            title: '网页头',
            template: './src/index.ejs',
            inject: false // true和head好像是同样效果
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // libs: {
                //     name: 'chunk-libs',
                //     test: /[\\/]node_modules[\\/]/,
                //     priority: 10,
                //     chunks: 'initial' // 只打包初始时依赖的第三方
                // },
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0 // This is example is too small to create commons chunks
                },
                vendor: { // 这里vendor与上面libs效果相同？？？
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: 'single',
    }
}