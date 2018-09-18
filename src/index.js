var fs = require('fs');
var path = require('path');
var cors = require('cors');
var Express = require('express');
var bodyParser = require('body-parser');

const app = new Express()
  , defaultRouter = new Express.Router();

const date = new Date()
  , dateString = `${date.getFullYear()}${date.getMonth()}${date.getDay()}`;

const queue = []
  , logFilename = process.env.LOG_FILE || path.resolve(__dirname, `../logs/${dateString}.log`)
  , doAction = () => {
    if (queue.length) {
      const item = queue.shift();

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
  const content = JSON.stringify(req.body);

  queue.push(content);

  res.status(201).end();
});

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(defaultRouter)
  .listen(3000, () => console.log('Listening on http://localhost:3000'));
