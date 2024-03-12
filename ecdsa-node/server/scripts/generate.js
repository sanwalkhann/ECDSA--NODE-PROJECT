const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

// Generate a random private key
const privateKey = secp256k1.utils.randomPrivateKey();

console.log('====================================');
console.log("Private Key:", toHex(privateKey));
console.log('====================================');

// Calculate public key from the private key
const publicKey = secp256k1.getPublicKey(privateKey);

console.log('====================================');
console.log("Public Key:", toHex(publicKey));
console.log('====================================');

// Hash the public key
const hashedPublicKey = keccak256(publicKey);

// Extract the last 20 bytes from the hash to get the address
const address = hashedPublicKey.slice(-20);

// Convert the address bytes to a hexadecimal string
const addressHex = "0x" + Buffer.from(address).toString("hex");

console.log('====================================');
console.log("Address:", addressHex);
console.log('====================================');
