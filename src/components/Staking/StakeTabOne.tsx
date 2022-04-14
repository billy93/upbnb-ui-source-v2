import React, { useEffect, useState } from 'react'
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { StakingService } from '../../services/StakingService';
import { shortenAddress, supportedChain } from '../../utils';
import { TokenService } from '../../services/TokenService';
import { ROOTED_ADDRESS, ROOTED_TICKER, STAKING_ADDRESS, STAKING_TICKER } from '../../constants';
import { extractErrorMessage } from '../../utils/extractErrorMessage';
import { PayFeesService } from '../../services/PayFeesService';
import useTokenBalance from '../../hooks/useTokenBalance';
import TransactionCompletedModal from '../TransactionCompletedModal';
import { getBalanceNumber, getDisplayBalance, getFullDisplayBalance } from '../../utils/formatBalance';
import { PendingContent } from '../Button';
import CurrencyInput from '../CurrencyInput';
import { ErrorMessage } from '../ErrorMessage';

enum Action {
    Stake,
    Unstake
}

enum StakingStatus {
    None,
    Approving,
    Approved,
    Staking,
    Staked
}

enum PayFeesStatus {
    None,
    Pending,
    Success
}

export default function StakeTabOne() {
    const { account, library, chainId } = useWeb3React();
    const [action, setAction] = useState<Action>(Action.Stake);
    const rootedBalance = useTokenBalance(ROOTED_ADDRESS);
    const stakingBalance = useTokenBalance(STAKING_ADDRESS);
    const [balance, setBalance] = useState<BigNumber>(new BigNumber(0));
    const [value, setValue] = useState<string>("");
    const [status, setStatus] = useState<StakingStatus>(StakingStatus.None);
    const [payFeesStatus, setPayFeesStatus] = useState<PayFeesStatus>(PayFeesStatus.None);
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [error, setError] = useState("");
    const [completedAction, setCompletedAction] = useState("");
    const [pendingAction, setPendingAction] = useState("");
    const [rate, setRate] = useState("");
    const [isApproved, setIsApproved] = useState<boolean>(false);

    useEffect(() => {
        setBalance(action === Action.Stake ? rootedBalance : stakingBalance)
    }, [action, rootedBalance, stakingBalance])

    
    useEffect(() => {
        const getRate = async () => {
            const stakedPerRooted = await new StakingService(library, account!).getRate();
            setRate(`${action === Action.Stake ? `1 upBNB = ${stakedPerRooted.toFixed(4)} xUpBNB` : `1 xUpBNB = ${(1/stakedPerRooted).toFixed(4)} upBNB`}`);
        }

        if(account && supportedChain(chainId)) {
            getRate();
        }        
        const timer = setInterval(() => getRate(), 30000)
        return () => clearInterval(timer)
    }, [library, account, chainId, action])

    useEffect(() => {
        const getIsApprove = async () => {
            const service = new TokenService(library, account!, ROOTED_ADDRESS);
            const approved = await service.isApproved(STAKING_ADDRESS);
            setIsApproved(approved);
            if(approved) {
                setStatus(StakingStatus.Approved);
            }
        }
        if(account && supportedChain(chainId)) {
            getIsApprove();
        }
    }, [library, account, chainId])

    const approve = async () => {
        try {
            setStatus(StakingStatus.Approving);
            const service = new TokenService(library, account!, ROOTED_ADDRESS);
            const txResponse = await service.approve(STAKING_ADDRESS);
            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                }
                else {
                    setError("Transaction Failed")
                }
            }
            setStatus(StakingStatus.Approved);
            setIsApproved(true);
        }
        catch (e) {
            console.log(e);
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setStatus(StakingStatus.None);
        }
    }

    const stake = async () => {
        const amount = parseFloat(value);
        if (Number.isNaN(amount) || amount <= 0) {
            setError("Enter amount");
            return;
        }
        setError("");

        try {
            setCompletedAction(`${value} ${action === Action.Stake ? ROOTED_TICKER : STAKING_TICKER} ${action === Action.Stake ? "staked" : "unstaked"}`);
            setPendingAction(`${action === Action.Stake ? "staking" : "unstaking"}...`);
            setStatus(StakingStatus.Staking);

            const service = new StakingService(library, account!)
            const txResponse = action === Action.Stake 
                ? await service.stake(value) 
                : await service.unstake(value)

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                }
                else {
                    setError("Transaction Failed")
                }
            }
            setStatus(StakingStatus.Staked);
            setValue("");
        }
        catch (e) {
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setStatus(StakingStatus.None)
        }
    }

    const payFees = async () => {
        setError("");
        setPayFeesStatus(PayFeesStatus.Pending);
        
        try{
            const service = new PayFeesService(library, account!)
            await service.payFees();
            setPayFeesStatus(PayFeesStatus.Success);
        } catch(e){
            setPayFeesStatus(PayFeesStatus.None)
        }
    }

  return (
    <>
        <Box className='stakone_main'>
            <TransactionCompletedModal title={completedAction} hash={transactionHash} isOpen={status === StakingStatus.Staked} onDismiss={() => setStatus(StakingStatus.None)} />
            <Heading as="h4" >Staking</Heading>
            {/* <Box className='stake_unstake_cro_btn_prnt'>
                <Button>Staking</Button>
                <Button>Vault Staking</Button>
            </Box> */}
            <Tabs variant='unstyled'>
            <TabList className='tab_btn_prnt'>
                <Box className='tab_border'>
                    <Tab bg={'#F3BA2F'} _selected={{ color: '#FFFFFF', bg: '#000000' }} className="staktab01" onClick={() => setAction(Action.Stake)}>Stake upBNB</Tab>
                    <Tab bg={'#F3BA2F'} _selected={{ color: '#FFFFFF', bg: '#000000' }} className="staktab02" onClick={() => setAction(Action.Unstake)}>Unstake xUpBNB</Tab>
                </Box>
            </TabList>
            <TabPanels>
                <TabPanel className='stake_tab_panel01_prnt'>
                    <Box className='stake_tab_panel01'>
                        <Heading as="h6">{rate}</Heading>
                        
                        <CurrencyInput
                            value={value}
                            balance={getDisplayBalance(balance, 2)}
                            numericBalance={getBalanceNumber(balance)}
                            onSubmit={stake}
                            ticker={action === Action.Stake ? ROOTED_TICKER : STAKING_TICKER}
                            label={`Amount to ${action === Action.Stake ? "stake" : "unstake"}`}
                            onMax={() => setValue(getFullDisplayBalance(balance))}
                            showMaxButton={true}
                            onUserInput={setValue}
                            id={"stakingInput"}
                        />

                        {action === Action.Unstake || isApproved
                        ? 
                            <Button className='stake_full_btn' disabled={status === StakingStatus.Staking || !supportedChain(chainId)} onClick={stake}>
                                {status === StakingStatus.Staking 
                                ? <PendingContent text={pendingAction}/> 
                                : `${action === Action.Stake ? "Stake" : "Unstake"}`}
                            </Button>
                        :
                            <div>
                                <Button className='stake_full_btn' onClick={approve} disabled={status === StakingStatus.Approving || !supportedChain(chainId)}>
                                    {status === StakingStatus.Approving 
                                        ? <PendingContent text={"Approving..."}/>
                                        : status === StakingStatus.Approved ? "Approved" : "Approve"
                                    }
                                </Button>
                                <br/>
                                <Button className='stake_full_btn' disabled={status !== StakingStatus.Approved || !supportedChain(chainId)} onClick={stake}>
                                    {status === StakingStatus.Staking
                                        ? <PendingContent text={"Staking..."}/>
                                        : "Stake"
                                    }
                                </Button>                                
                            </div>
                        }

                        <Button className='stake_full_btn' disabled={payFeesStatus !== PayFeesStatus.None || !supportedChain(chainId)} onClick={payFees}>
                        {payFeesStatus === PayFeesStatus.Pending
                            ? <PendingContent text={"Pay Fees..."}/>
                            : payFeesStatus === PayFeesStatus.None ? "Pay Fees" :
                            "Pay Fees Success"
                        }
                        </Button>

                        {error ? <ErrorMessage error={error} /> : null}
                    </Box>
                    {/* <Box className='stake_emp_dex_btns'>
                        <Button disabled className='btn_dc'>Stake</Button>
                        <Button>EmpireDEX</Button>
                        <Button>DEXScreener</Button>
                    </Box> */}
                </TabPanel>
                <TabPanel className='stake_tab_panel01_prnt stake_tab_panel02_prnt'>
                    <Box className='stake_tab_panel01'>
                        <Heading as="h6">{rate}</Heading>
                        
                        <CurrencyInput
                            value={value}
                            balance={getDisplayBalance(balance, 2)}
                            numericBalance={getBalanceNumber(balance)}
                            onSubmit={stake}
                            ticker={action === Action.Stake ? ROOTED_TICKER : STAKING_TICKER}
                            label={`Amount to ${action === Action.Stake ? "stake" : "unstake"}`}
                            onMax={() => setValue(getFullDisplayBalance(balance))}
                            showMaxButton={true}
                            onUserInput={setValue}
                            id={"stakingInput"}
                        />

                        {action === Action.Unstake || isApproved
                        ? 
                            <Button className='stake_full_btn' disabled={status === StakingStatus.Staking || !supportedChain(chainId)} onClick={stake}>
                                {status === StakingStatus.Staking 
                                ? <PendingContent text={pendingAction}/> 
                                : `${action === Action.Stake ? "Stake" : "Unstake"}`}
                            </Button>
                        :
                            <div>
                                <Button className='stake_full_btn' onClick={approve} disabled={status === StakingStatus.Approving || !supportedChain(chainId)}>
                                    {status === StakingStatus.Approving 
                                        ? <PendingContent text={"Approving..."}/>
                                        : status === StakingStatus.Approved ? "Approved" : "Approve"
                                    }
                                </Button>
                                <br/>
                                <Button className='stake_full_btn' disabled={status !== StakingStatus.Approved || !supportedChain(chainId)} onClick={stake}>
                                    {status === StakingStatus.Staking
                                        ? <PendingContent text={"Staking..."}/>
                                        : "Stake"
                                    }
                                </Button>                                
                            </div>
                        }

                        <Button className='stake_full_btn' disabled={payFeesStatus !== PayFeesStatus.None || !supportedChain(chainId)} onClick={payFees}>
                        {payFeesStatus === PayFeesStatus.Pending
                            ? <PendingContent text={"Pay Fees..."}/>
                            : payFeesStatus === PayFeesStatus.None ? "Pay Fees" :
                            "Pay Fees Success"
                        }
                        </Button>
                    </Box>

                    {error ? <ErrorMessage error={error} /> : null}
                    {/* <Box className='stake_emp_dex_btns stake_emp_dex_btns02'>
                        <Button>EmpireDEX</Button>
                        <Button>DEXScreener</Button>
                    </Box> */}
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Box>
        <Box className='contracts_box'>
            <Heading as="h4">Contracts</Heading>
            <Box className='upcro_copyflex'>
                <Heading as="h6">upBNB<Text>{shortenAddress(ROOTED_ADDRESS)}<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
                <Heading as="h6" className='right_h6'>xUpBNB<Text>{shortenAddress(STAKING_ADDRESS)}<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
            </Box>
            <Box className='upcro_copyflex'></Box>
        </Box>
    </>
  )
}
