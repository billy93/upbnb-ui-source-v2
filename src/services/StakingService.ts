import { Contract } from '@ethersproject/contracts'
import stakingAbi from '../constants/abis/staking.json'
import { Web3Provider } from '@ethersproject/providers'
import { ROOTED_ADDRESS, STAKING_ADDRESS } from '../constants'
import { parseEther } from '@ethersproject/units'
import { TokenService } from './TokenService'
import BigNumber from 'bignumber.js'

export class StakingService {
    private contract: Contract;
    private tokenService: TokenService;
    
    constructor(library: Web3Provider, account: string) {
        const signer = library.getSigner(account).connectUnchecked()
        this.contract = new Contract(STAKING_ADDRESS, stakingAbi, signer);
        this.tokenService = new TokenService(library, account, ROOTED_ADDRESS);
    }

    public async stake(amount: string) {
        return await this.contract.stake(parseEther(amount));
    }

    public async unstake(amount: string) {
        return await this.contract.unstake(parseEther(amount));
    }

    public async getRate() {
        const totalSupply = await this.contract.totalSupply();
        const rootedBalance = await this.tokenService.getBalance(STAKING_ADDRESS);
        const rate = new BigNumber(totalSupply.toString()).div(new BigNumber(rootedBalance.toString()));
        return rate.toNumber();
    }
}

