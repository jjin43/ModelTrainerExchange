import { AccountId, ContractId, TokenId, Client, PrivateKey } from "@hashgraph/sdk";
import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import SendIcon from '@mui/icons-material/Send';
import { useContext, useState } from "react";
import {sendHbar} from "../services/haderaTransfer/haderaTransfer"
import { MetamaskContext } from "../contexts/MetamaskContext";
import { useNavigate } from "react-router-dom";

 const Contractor = () => {
  const { walletInterface } = useWalletInterface();
  // const [toAccountId, setToAccountId] = useState("");
  // const [amount, setAmount] = useState(1);
  // if (!process.env.REACT_APP_MY_ACCOUNT_ID || !process.env.REACT_APP_MY_PRIVATE_KEY) {
  //   throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
  // }
  // const myAccountId = AccountId.fromString(process.env.REACT_APP_MY_ACCOUNT_ID);
  // const myPrivateKey = PrivateKey.fromString(process.env.REACT_APP_MY_PRIVATE_KEY);
  // const { metamaskAccountAddress } = useContext(MetamaskContext);

  // const client = Client.forTestnet();
  // client.setOperator(myAccountId, myPrivateKey);
  let navigate = useNavigate(); 
  const routeChangeContractor = () =>{ 
    let path = `/Contractor`; 
    navigate(path);
  }
  const routeChangeList = () =>{ 
    let path = `/ContractList`; 
    navigate(path);
  }
  

  return (
    <Stack alignItems="center" spacing={4}>
        <Typography variant='h2' fontStyle='italic'> Model Trainer Exchange</Typography>
        <Typography> Let others train your AI model</Typography>
        <Typography> By Uploading Your Model to Hadera Blockchain with Us</Typography>
        <br></br>
        {walletInterface == null &&(
            <Typography variant="h2">Please Log in to Wallet Manager</Typography>
        )}
        {walletInterface !== null && (
            <Stack
                    direction='row'
                    gap={2}
                    alignItems='center'
                >
                    
            <Button variant="contained" size="large" onClick={routeChangeList}>My Contracts</Button>
            <Button variant="contained" size="large" onClick={routeChangeContractor}>Submit New Contract</Button>
            </Stack>
        )}
  </Stack>
        
  )
}
export default Contractor;