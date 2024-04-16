import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";



function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  
  return (
    <MoralisProvider initializeOnMount={false} style={{backgroundImage: "url('bacgkround.jpeg')"}}>
      {getLayout(<Component {...pageProps} />)}

    
    </MoralisProvider>
  );
}

export default MyApp;
