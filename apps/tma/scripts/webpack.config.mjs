/* eslint-disable no-undef */
import { resolve } from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { EsbuildPlugin } from "esbuild-loader";
import PreactRefreshPlugin from "@prefresh/webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isProduction = process.env.NODE_ENV === "production";

/**
 * @type {import("webpack").Configuration & import("webpack-dev-server").Configuration}
 */
export default {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: resolve(import.meta.dirname, "../dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".mjs", ".cjs", ".css"],
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat", // Должно быть ниже test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  module: {
    rules: [
      // Use esbuild to compile JavaScript & TypeScript
      {
        // Match `.js`, `.jsx`, `.ts` or `.tsx` files
        test: /\.[jt]sx?$/,
        loader: "esbuild-loader",
        options: {
          // JavaScript version to compile to
          target: "es2022",
        },
      },

      // CSS
      // CSS Modules (только *.module.css)
      {
        test: /\.module\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                mode: "local",
                auto: true,
                localIdentName: isProduction ? "[hash:base64:4]" : "[name]_[local]_[hash:base64:5]",
                namedExport: false,
              },
            },
          },
        ].filter(Boolean),
      },
      // Глобальные CSS (всё остальное, кроме *.module.css)
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"].filter(
          Boolean
        ),
      },
    ],
  },
  plugins: [
    !isProduction && new webpack.HotModuleReplacementPlugin(),
    !isProduction && new PreactRefreshPlugin(),
    new EsbuildPlugin({
      define: {
        "process.env.NODE_ENV": isProduction ? "production" : "development",
      },
    }),
    new MiniCssExtractPlugin({ filename: "[contenthash].css", chunkFilename: "[contenthash].css" }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new webpack.ProvidePlugin({ React: "preact" }),
  ].filter(Boolean),
  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
};
