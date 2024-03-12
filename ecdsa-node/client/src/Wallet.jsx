import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, privateKey , setprivateKey}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setprivateKey(privateKey);
    console.log('====================================');
    console.log(privateKey);
    console.log('====================================');

    const address = toHex(secp256k1.getPublicKey(privateKey));
    setAddress(address)
    console.log('====================================');
    console.log(address);
    console.log('====================================');
     
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a Private Key" value={privateKey} onChange={onChange}></input>
      </label>


      <div>
      Address : {address.slice(0,20)}
      </div>



      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
