const cors = require('cors');
const Express = require('express');
const readline = require('readline');
const bodyParser = require('body-parser');

const app = new Express(),
  defaultRouter = new Express.Router();

require('./log')(defaultRouter);

const port = parseInt(process.env.PORT || '3044');
app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(defaultRouter)
  .listen(port, () =>
    console.log(`PID: ${process.pid}\nListening on http://localhost:${port}`)
  );

if (process.platform === 'win32') {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', function() {
    process.emit('SIGINT');
  });
}
