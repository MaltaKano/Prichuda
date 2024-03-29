
const webpack = require("webpack");

module.exports = {
  swcMinify: true,
  webpack: (config, { webpack }) => {
    config.plugins.push(
     new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery",
     "window.jQuery": "jquery",
    }));
   return config;
   },
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
}
