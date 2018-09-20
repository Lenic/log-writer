const qs = require('qs');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const _ = require('underscore');
const URL = require('url-parse');
const Express = require('express');
const UAParser = require('ua-parser-js');
const bodyParser = require('body-parser');

const queue = []
  , app = new Express()
  , defaultRouter = new Express.Router()
  , datePadding = value => value < 10 ? `0${value}` : value
  , logPath = process.env.LOG_FILE || path.resolve(__dirname, '../logs')
  , getDateString = date => `${date.getFullYear()}${datePadding(date.getMonth() + 1)}${datePadding(date.getDate())}`;

if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath);
}

const doAction = () => {
  if (queue.length) {
    const item = queue.shift()
      , dateString = getDateString(new Date())
      , logFilename = path.resolve(logPath, `${dateString}.log`);

    fs.appendFile(logFilename, `${item}\n`, 'utf-8', err => {
      err && queue.push(item);
    });
  }

  if (queue.length) {
    doAction();
  } else {
    setTimeout(doAction, 10);
  }
};

doAction();

defaultRouter.post('/log', (req, res) => {
  if (!_.isArray(req.body)) {
    return res.status(400).end();
  }

  const info = {
    ip: req.ip,
    ips: req.ips,
    serverTimestamp: Date.now(),
    referer: new URL(req.get('Referer'), null, v => qs.parse(v.slice(1))),
    userAgent: (new UAParser(req.get('User-Agent'))).getResult(),
  };

  for (let i = 0; i < req.body.length; i++) {
    const item = req.body[i]
      , content = {
        request: info,
        body: _.omit(item, 'href'),
        href: new URL(item.href, null, v => qs.parse(v.slice(1))),
      };

    queue.push(JSON.stringify(content));
  }

  res.status(201).end();
});

const port = parseInt(process.env.PORT || '3044');

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(defaultRouter)
  .listen(port, () => console.log(`Listening on http://localhost:${port}`));
