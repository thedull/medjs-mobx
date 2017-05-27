const path = require("path"),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HOST = process.env.HOST,
    PORT = process.env.PORT;
let commonPlugins = [],
    cssExtract = process.env.NODE_ENV === "production"
        ? ExtractTextPlugin.extract({ fallback: "style", use: [ "css", "postcss", "sass" ], })
        : [ "style", "css", "postcss", "sass" ];

module.exports = {
    devServer: {
        compress: true,
        inline: true,
        hot: true,
        historyApiFallback: true,
        port: PORT,
        host: HOST,
        open: false,
        disableHostCheck: true,
        headers: {'Access-Control-Allow-Origin': '*'},
    },
    entry: [
        "whatwg-fetch",
        "./src/Entry",
    ],
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: `http://mobx-medjs-thedull.c9users.io:${PORT}/`,
        filename: "[name].js",
        chunkFilename: "[name].[chunkhash:6].chunk.js",
    },
    resolve: {
        extensions: [".jsx", ".js", ".sass", ".scss"],
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["babel", "eslint"],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|sass)$/,
                use: cssExtract,
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                        {
                            loader: 'file-loader',
                            options: {
                                query: {
                                    name:'assets/[name].[ext]'
                                }
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                query: {
                                    mozjpeg: {
                                        progressive: true,
                                    },
                                    gifsicle: {
                                        interlaced: true,
                                    },
                                    optipng: {
                                        optimizationLevel: 7,
                                    }
                                }
                            }
                        }
                ]
            }
        ]
    },
    plugins: []
};

if (process.env.NODE_ENV === "production") {
    commonPlugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        }),
        new ExtractTextPlugin({
            filename: "[name].style.[contenthash].css",
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            output: false,
            compress: {
                unused: true,
                dead_code: true,
                pure_getters: true,
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                comparisons: true,
                sequences: true,
                evaluate: true,
                join_vars: true,
                if_return: true,
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            quiet: true,
        }),
    ];
} else {
    commonPlugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true,
            hash: true,
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                eslint: {
                    configFile: './.eslintrc',
                },
            }
        }),
    ];
    module.exports.devtool = "source-map";
}

module.exports.plugins = module.exports.plugins.concat(commonPlugins);
