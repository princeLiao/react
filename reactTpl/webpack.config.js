var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pxtorem = require('postcss-pxtorem');
var env = process.env.NODE_ENV.trim();
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.jsx$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
];
const paths = {
  component: path.join(__dirname, './src/component'),
  entry: path.join(__dirname, './src/entry'),
  common: path.join(__dirname, './src/js/common'),
  action: path.join(__dirname, './src/action')
};
let entryArr = [{
  name: "index",
  title: ''
}];
let appEntrys = [];
let htmlArray = [];
let entrys = {};
entryArr.map((x, i) => {
  appEntrys.push(__dirname + "/src/entry/" + x.name + ".jsx");
  entrys["app_" + i] = appEntrys[i];
  htmlArray.push(new HtmlWebpackPlugin({
    // 配置参考 http://www.cnblogs.com/sunflowerGIS/p/6820912.html
    curEnv: env == "dev" ? 'dev' : 'prod',
    title: x.title,
    chunks: ["vendors", "app_" + i],
    filename: x.name + '.html',
    template: __dirname + "/src/index.tmpl.html", //new 一个这个插件的实例，并传入相关的参数
    minify: env == "dev" ? false : {
      "removeAttributeQuotes": true,
      "removeComments": true,
      "removeEmptyAttributes": true,
    }
  }));
});
entrys["vendors"] = ["react", "react-dom", 'react-router-dom'];
module.exports = {
  devtool: 'false',
  entry: entrys,
  output: {
    path: __dirname + "/dist/",
    filename: "js/[name].[chunkhash:8].js"
  },
  resolve: {
    extensions: ['.web.js', '.jsx', '.js', '.json'],
    //antd中 .web.js 放在 .js 之前，这样就会优先找.web.js后缀的js：
    alias: {
      component: paths.component,
      entry: paths.entry,
      common: paths.common,
      action: paths.action
    }
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: "json"
    },
    {
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: [
          ["transform-runtime", {
            polyfill: false
          }],
          ["import", [{
            "style": "css",
            "libraryName": "antd-mobile"
          }]],
          "lodash"
        ],
        presets: ['es2015', 'stage-2', 'react']
      }
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader!postcss-loader?module"
      })
    },
    {
      test: /\.less$/i,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader!less-loader!postcss-loader?module"
      })
    },
    {
      test: /\.scss$/i,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader!sass-loader!postcss-loader?module"
      })
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader',
      query: {
        limit: 8192,
        name: 'img/[name][hash:8].[ext]'
      }
    },
    {
      test: /\.(svg)$/i,
      loader: 'svg-sprite-loader',
      include: [
        require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
      ]
    },
    ]
  }
}
console.log("当前环境: " + env)
if (env == "dev") {
  var OpenBrowserPlugin = require('open-browser-webpack-plugin');
  module.exports.devtool = 'eval-source-map';
  module.exports.devServer = {
    contentBase: "./dist/", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    hot: false,
    inline: true,//实时刷新
    port: 3005
    // proxy: {
    //   '/faceid/*': {
    //     target: 'https://static1.wdai.com',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // }
  };
  module.exports.plugins = [
    new webpack.DefinePlugin({
      _env_: JSON.stringify("development")
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [require('autoprefixer'), pxtorem({
            rootValue: 100,
            propWhiteList: []
          })];
        }
      }
    }),
    ...htmlArray,
    new OpenBrowserPlugin({
      url: 'http://localhost:3005/'
    }),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/lib'
    }, {
      from: __dirname + '/img/',
      to: __dirname + '/dist/img'
    }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/vendors.bundle.js'
    }),

    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: false,
      allChunks: true
    }),
  ];

} else {
  var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  var CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports.devtool = 'false';
  module.exports.plugins = [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new CleanWebpackPlugin(
      ['dist/*'], 　 //匹配删除的文件
      {
        root: path.resolve(__dirname),
        //根目录
        verbose: true,
        //开启在控制台输出信息
        dry: false
      }
    ),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/lib'
    }, {
      from: __dirname + '/img/',
      to: __dirname + '/dist/img'
    }]),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [require('autoprefixer'), pxtorem({
            rootValue: 100,
            propWhiteList: []
          })];
        }
      }
    }),

    new webpack.BannerPlugin("Copyright by lww"), //版权声明
    ...htmlArray,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/[name].[chunkhash:8].js'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash:8].css",
      disable: false,
      allChunks: true
    }),
  ];

}