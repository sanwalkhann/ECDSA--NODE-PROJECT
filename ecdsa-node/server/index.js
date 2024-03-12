import express from "express";
const app = express();
import cors from "cors";
const port = 3042;
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak";
app.use(cors());
app.use(express.json());

const balances = {
  "027a64b4d49b495591ef2c8900bbf39303118b13fdba909df945af7a058dfb3b28": 100,
  "0281592817819958c2e3d6d1d4ce1550ffcd6aae776aef6337f68b5b86cf022a0a": 50,
  "027a64b4d49b495591ef2c8900bbf39303118b13fdba909df945af7a058dfb3b28": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, sig: sigStringed, msg } = req.body;
  const { recipient, amount } = msg;

  const sig = {
    ...sigStringed,
    r: BigInt(sigStringed.r),
    s: BigInt(sigStringed.s),
  };
  const hashMessage = (message) => keccak256(Uint8Array.from(message));

  const isValid = secp256k1.verify(sig, hashMessage(msg), sender) === true;

  if (!isValid) res.status(400).send({ message: "Bad signature!" });

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
