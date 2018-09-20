const qs = require('qs');
const _ = require('underscore');
const URL = require('url-parse');
const log4js = require('log4js');
const UAParser = require('ua-parser-js');
const bodyParser = require('body-parser');

const logger = require('./logger');

let isStopped = false;

const stopHandler = () => (isStopped = true);
process.on('SIGINT', stopHandler).on('SIGTERM', stopHandler);

const queue = [],
  doAction = () => {
    if (queue.length) {
      logger.info(queue.shift());
    } else if (isStopped) {
      console.log('\nqueue clean up.');

      return log4js.shutdown(err => {
        if (err) {
          console.log(err);
        } else {
          console.log('log4js clean up.');

          process.exit(0);
        }
      });
    }

    if (queue.length) {
      doAction();
    } else {
      setTimeout(doAction, 10);
    }
  };

doAction();

module.exports = function(router) {
  router.post('/log', (req, res) => {
    if (!_.isArray(req.body)) {
      return res.status(400).end();
    }

    if (isStopped) {
      return res.status(405).end();
    }

    const info = {
      ips: req.ips,
      serverTimestamp: Date.now(),
      referer: new URL(req.get('Referer'), null, v => qs.parse(v.slice(1))),
      userAgent: new UAParser(req.get('User-Agent')).getResult()
    };

    for (let i = 0; i < req.body.length; i++) {
      const item = req.body[i],
        content = {
          request: info,
          body: _.omit(item, 'href'),
          href: new URL(item.href, null, v => qs.parse(v.slice(1)))
        };

      queue.push(JSON.stringify(content));
    }

    res.status(201).end();
  });
};
