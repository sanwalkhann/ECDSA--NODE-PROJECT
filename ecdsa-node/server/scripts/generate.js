import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey = secp256k1.getPublicKey(privateKey);
console.log("This is private key : " + toHex(privateKey));
console.log("This is public key : ", toHex(publicKey));
