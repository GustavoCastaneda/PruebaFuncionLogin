import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react"
import { injected } from "../components/wallet/connectors"
import { MoralisProvider } from "react-moralis";


export default function Home() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
   // connect to Moralis server
  const serverUrl = "https://liziwsuszlqk.usemoralis.com:2053/server";
  const appId = "uAQd04bHxK1iZy8qJt1yhTl7S5W8WI4JdukDtW3R";
  Moralis.start({ serverUrl, appId });


  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', false)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function getNFT(){
    let address = document.getElementById('nftaddress').value;

    const options = { 
        chain: 'matic', 
        address: address 
    };
    const polygonNFTs = await Moralis.Web3.getNFTs(options);
    console.log(polygonNFTs);

    //Loop over the array
    polygonNFTs.forEach( e => {
        let url = e.token_uri;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            
            let currentDiv = document.getElementById("content");
            let content = `
            <div class="nft">
                <p>${data.name}</p>
                <p>${data.description ? data.description : ""}</p>
                <img width=100 height=100 src="${data.image}"/>
            </div>
            `
            currentDiv.innerHTML += content;
        })
    })
}


  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
      <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
      <button onclick="getNFT()" className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Mostrar NFTs</button>
    </div>
  )
}


