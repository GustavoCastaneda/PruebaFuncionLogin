import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import '../styles/globals.css'
import {MoralisProvider} from "react-moralis"

function getLibrary(provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

function MyApp({Component, pageProps}) {
  return(
  
    <MoralisProvider 
    appId='6lBD71Mo22ez4lirpwGrJCUsiIo3mnICTRRzTumY' 
    serverUrl='https://jp1q6eia3n4c.usemoralis.com:2053/server'>
      {
        <Component {...pageProps} />
      }
    </MoralisProvider>
    );
  }
  
export default MyApp

