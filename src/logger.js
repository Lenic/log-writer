const fs = require('fs');
const path = require('path');
const log4js = require('log4js');

const logPath = process.env.LOG_FILE || path.resolve(__dirname, '../logs');

if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath);
}

log4js.configure({
  pm2: process.env.NODE_ENV === 'production',
  pm2InstanceVar: 'INSTANCE_ID',
  appenders: {
    pure: {
      backups: 3,
      daysToKeep: 3,
      compress: true,
      type: 'dateFile',
      keepFileExt: true,
      pattern: '.yyyy-MM-dd-hh',
      maxLogSize: 1024 * 1024 * 12,
      filename: path.resolve(logPath, 'access.log'),
      layout: {
        type: 'messagePassThrough'
      }
    }
  },
  categories: {
    default: {
      level: 'trace',
      appenders: ['pure']
    }
  }
});

module.exports = log4js.getLogger('default');
