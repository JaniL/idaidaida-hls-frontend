const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["admin.idaidaida.net"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig;
