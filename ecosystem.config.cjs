// PM2 process file for Hostinger VPS
// The TanStack Start build outputs a Node server at .output/server/index.mjs
module.exports = {
  apps: [
    {
      name: "bpacvet",
      script: "./.output/server/index.mjs",
      cwd: "/var/www/bpacvet",
      instances: 1,
      exec_mode: "fork",
      env_file: ".env",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      time: true,
      max_memory_restart: "500M",
    },
  ],
};
