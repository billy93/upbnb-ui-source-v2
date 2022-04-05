import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

const useBlock = () => {
  const [block, setBlock] = useState(0);
  const { chainId, library } = useWeb3React();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (library) {
        const latestBlockNumber = await library.getBlockNumber();
        setBlock(latestBlockNumber);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [chainId, library]);

  return block;
};

export default useBlock;
