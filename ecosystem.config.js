module.exports = {
  apps: [
    {
      name: 'dinemate-server',
      script: './index.js',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss:SSS',
    }
  ]
}
