module.exports = {
  webpack: (config: any) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    return config;
  },
  // Add Babel configuration for server components
  babel: {
    presets: ["next/babel"],
    plugins: ["@babel/plugin-transform-runtime"],
  },
};
