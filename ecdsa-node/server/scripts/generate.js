const secpsecp256k1 = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secpsecp256k1.utils.randomPrivateKey();
const publicKey = secpsecp256k1.getPublicKey(privateKey);
const address = keccak256(publicKey.slice(1)).slice(-20);

console.log("private key: ", toHex(privateKey));
console.log("public key: ", toHex(publicKey));
console.log(`address: 0x${toHex(address)}`);