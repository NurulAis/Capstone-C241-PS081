const express = require('express');
const app = express();
const port = 3000;
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');

app.use(express.json());

async function loadModel() {
  return {};
}

(async () => {
  const model = await loadModel();
  app.locals.model = model;

  app.get('/route', (req, res) => {
    res.send('Hello, world!');
  });

  app.use((err, req, res, next) => {
    if (err instanceof InputError) {
      res.status(err.statusCode || 400).json({
        status: 'fail',
        message: `${err.message} Silakan gunakan foto lain.`
      });
    } else if (err.isBoom) {
      res.status(err.output.statusCode || 500).json({
        status: 'fail',
        message: err.message
      });
    } else {
      next(err);
    }
  });

  app.listen(port, () => {
    console.log(`Server started at: http://localhost:${port}`);
  });
})();
