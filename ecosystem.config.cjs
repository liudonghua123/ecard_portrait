// https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [{
    name: 'ecard_portrait',
    script: 'index.mjs',
    watch: '.',
    log_date_format: "YYYY-MM-DD HH:mm Z",
    combine_logs: true,
    log_file: "app.log",
    out_file: "app_stdout.log",
    error_file: "app_stderr.log",
  }],
};
