const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/get-vault-key', (req, res) => res.send({ key: 'i am actually an address' }));

app.use('/generate-key', (req, res) =>
  res.send({ address: '0x9193d626a1A3668AAdeaFF4fda44A3a52A784021' })
);

app.use('/execute-transaction', (req, res) => {
  const { from, to, amount, gasLimit, gasPrice, data } = req.body;
  res.send({ txHash: 'i am a tx hash' });
});

app.use('/get-balance', (req, res) => {
  const { address } = req.body;
  res.send({ balance: '100000000000000000000'});
});

app.listen(7000, () => console.log('http://localhost:7000'));
