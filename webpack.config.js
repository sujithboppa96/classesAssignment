const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[local]'
                    }
                },
                    {loader: 'sass-loader'
                }
                ]
            },
            {
                test: /\.tsx$/,
                use: [
                    {loader: 'babel-loader'},
                    {
                        loader: 'ts-loader',
                        options: {
                            silent: true,
                            transpileOnly: true, // type check was moved to ForkTsCheckerWebpackPlugin to suport parallelism
                            happyPackMode: true, //HappyPack allows to transform multiple files in parallel
                            compilerOptions: {
                                noEmit: false,
                                target: 'es6'
                            },
                            experimentalWatchApi: true,
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]'
                        }
                     },
                     {
                         loader: 'postcss-loader',
                         options: {
                             ident: 'postcss',
                             plugins: () => [
                                 autoprefixer({
                                     browsers: [
                                        "> 1%",
                                        "last 2 versions"
                                     ]
                                 })
                             ]
                         }
                      }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=8000&name=images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};