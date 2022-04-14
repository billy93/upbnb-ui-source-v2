import { Contract } from '@ethersproject/contracts'
import feeSplitterAbi from '../constants/abis/feeSplitter.json'
import { Web3Provider } from '@ethersproject/providers'
import { FEESPLITTER_ADDRESS } from '../constants'

export class PayFeesService {
    private contract: Contract;
    
    constructor(library: Web3Provider, account: string) {
        const signer = library.getSigner(account).connectUnchecked()
        this.contract = new Contract(FEESPLITTER_ADDRESS, feeSplitterAbi, signer);
    }

    public async payFees() {
        return await this.contract.payFees("0x1759254EB142bcF0175347D5A0f3c19235538a9A");
    }

}

