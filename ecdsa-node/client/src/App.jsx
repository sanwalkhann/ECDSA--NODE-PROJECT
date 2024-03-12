import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setprivateKey] = useState("");
  
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setprivateKey = {setprivateKey}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address}  />
    </div>
  );
}

export default App;
