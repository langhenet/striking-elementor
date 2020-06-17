// import '../SASS/style.scss';

const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const HtmlWebpackPlugin = require('html-webpack-plugin')

// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')


// const mainJSPath = path.resolve(__dirname, '../_src/js', 'main.js');
const mainCSSPath = path.resolve(__dirname, '../SASS', 'style.scss');

const publicPath = path.resolve(__dirname, '../');
const imagesPath = path.resolve(__dirname, '../_src/images');
const fontsPath = path.resolve(__dirname, '../_src/fonts');

// entry_object[build_css + "style"] = static_scss + "../SASS/style.scss";

//var autoprefixer = require('autoprefixer');

switch(process.env.NODE_ENV){
  case 'dev':
    BASE_URL = '/';
    API_URL  = 'http://clienti.langhe.test/';
    WP_THEME_LOCATION  = '/wp-content/themes/frontend-child/'
    break;
  case 'prod':
    BASE_URL = '/';
    API_URL = 'http://clienti.lovelanghe.com/';
    WP_THEME_LOCATION  = '/wp-content/themes/frontend-child/'
    break;
  default:
    //nothing here;
    break;
}

module.exports = {
  entry: [mainCSSPath],
  // entry: {
  //   main: [
  //     // mainJSPath,
  //     mainCSSPath,
  //   ]
  // },
  output: {
    // filename: process.env.NODE_ENV === 'prod' ? 'assets/scripts/[name].js' : 'assets/scripts/[name].js',
    path: publicPath,
    // publicPath: '/'
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $ : 'jquery',
    //   $ : 'jQuery',
    //   objectFitImages: 'object-fit-images'
    // }),
    new webpack.DefinePlugin({
      "BASE_URL": JSON.stringify(BASE_URL),
      "API_URL": JSON.stringify(API_URL)
    }),
    new CleanWebpackPlugin(
      {
        dry: false,
        verbose: true,
        cleanStaleWebpackAssets: false,
        cleanOnceBeforeBuildPatterns: ['!**/*', 'assets/images' , 'assets/fonts' , 'main.js']
      }
    ),

    // Simply copy assets to dist folder
    new CopyWebpackPlugin([
      { from: imagesPath, to: 'assets/images' },
      { from: fontsPath, to: 'assets/fonts' }
    ]),

    new MiniCssExtractPlugin({
      filename: 'style.css',
      fallback: 'style-loader',
      ignoreOrder: false
    }),
  ],
  resolve: {
		alias: {
      // silence is golden
		}
	},
  module: {
		rules: [
			//SASS compilation
			{
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'dev'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({
                overrideBrowserslist: [
                  'last 10 versions'
                ],
                grid: true
              })]
            }
          },
          'sass-loader'
        ]
      },
      //recognise fonts
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1,
                name: '[name].[ext]',
                outputPath: 'assets/fonts'
              }
            }]
      },
      {
        test: /\.(jpg|png|svg|jpeg)$/,
        use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1,
                name: '[name].[ext]',
                outputPath: 'assets/images'
              }
            }]
      },
		],
	}
};
