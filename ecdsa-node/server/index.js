import express from "express";
const app = express();
import cors from "cors";
const port = 3042;
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak";
app.use(cors());
app.use(express.json());

const balances = {
  "03fe1fdc71b1ed668ccbe166d339fdba75c7e6491bebd6ab741e17cfa724ce1c12": 100,
  "03de8ec78529e12351029892c10ecaa3571079a8917c5d7a9bb1de76eba02f3bc3": 50,
  "03f52f9dd14a61512d913726bf87be5281febcedf0cd5e44d5b1b6f5c436cb0a93": 75,
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
