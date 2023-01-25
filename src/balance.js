
import Fortmatic from "fortmatic";

const fm = new Fortmatic('pk_test_65D610E3A0F5F9FB','rinkeby');
const provider = new ethers.providers.Web3Provider(fm.getProvider());
const signer = provider.getSigner();

useEffect(()=>{
    signer.getAddress().then((address)=>{
      console.log(address);
      const res = parseFloat(ethers.utils.formatEther(provider.getBalance(address)));;
      setBalance(res);
    })
});