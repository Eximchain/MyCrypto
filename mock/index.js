const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (!req.get('authorization')) {
    return res.sendStatus(401);
  }

  next();
});

app.use('/get-vault-key', (req, res) =>
  res.send({ key: '0x9193d626a1A3668AAdeaFF4fda44A3a52A784021' })
);

app.use('/generate-key', (req, res) =>
  res.send({ address: '0x9193d626a1A3668AAdeaFF4fda44A3a52A784021' })
);

app.use('/execute-transaction', (req, res) => {
  const { from, to, amount, gasLimit, gasPrice, data } = req.body;
  res.send({ txHash: '0xda673c48dfed2d542ae949bf8e810eb7dfb0ccf87248c6fb5ea31da93acb74f2' });
});

app.use('/get-balance', (req, res) => {
  const { address } = req.body;
  res.send({ balance: '188000000000000000000' });
});

app.use('/get-current-block', (req, res) => {
  res.send({ block: '100000' });
});

app.listen(7000, () => console.log('http://localhost:7000'));
