/** @type {import('next').NextConfig} */

const withVideos = require("next-videos");

const nextConfig = {
  output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
};

module.exports = nextConfig;
module.exports = withVideos();
