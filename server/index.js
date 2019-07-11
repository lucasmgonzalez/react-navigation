import express from 'express';
import renderer from './renderer';

const PORT = 3000;
const path = require('path');

const app = express();
const router = express.Router();

router.use('/static', express.static(path.resolve(__dirname, '../build/static')));

router.use('*', renderer);

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
