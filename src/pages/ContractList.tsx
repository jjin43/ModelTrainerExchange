import { AccountId, ContractId, TokenId, Client, PrivateKey } from "@hashgraph/sdk";
import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import SendIcon from '@mui/icons-material/Send';
import { useContext, useState } from "react";
import {sendHbar} from "../services/haderaTransfer/haderaTransfer"
import { MetamaskContext } from "../contexts/MetamaskContext";
import { ContractContext } from "../contexts/ContractContex";

 const ContractList = () => {
  const { walletInterface } = useWalletInterface();
  const [toAccountId, setToAccountId] = useState("");
  // const [amount, setAmount] = useState(1);
  const [status, setStatus] = useState('Public');
  if (!process.env.REACT_APP_MY_ACCOUNT_ID || !process.env.REACT_APP_MY_PRIVATE_KEY) {
    throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
    }
  const myAccountId = AccountId.fromString(process.env.REACT_APP_MY_ACCOUNT_ID);
  const myPrivateKey = PrivateKey.fromString(process.env.REACT_APP_MY_PRIVATE_KEY);
  const { contractStatus, setContractStatus } = useContext(ContractContext);
  const { metamaskAccountAddress } = useContext(MetamaskContext);
  const handleStatus = () => setContractStatus('Public');
  let canceled = false

  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);
  

  return (
    <Stack alignItems="center" spacing={4}>
    <Typography>My Contracts</Typography>
    <>
          {contractStatus !== 'x' && (
          <Stack
            direction='row'
            gap={2}
            alignItems='center'
          >
            <Typography>Iris-Model</Typography>
            <br></br>
            <Typography> 10.00 HBar </Typography>
            <br></br>
            <Typography>{status}</Typography>
            <br></br>
            <TextField
              type='text'
              label='Path'
              value='https://drive.google.com/drive/folders/1oLMZfgtGpu8uvNvXD5tJ1inJZVvGdIBp?usp=sharing'
            />
            <br></br>
            <Button variant="outlined" onClick={async () =>{
              sendHbar(client, myAccountId, AccountId.fromEvmAddress(0, 0, metamaskAccountAddress), 10, myPrivateKey)
              alert("Contract Canceled! \n10.00 HBar Refunded For Iris-Model")
              setStatus('Canceled')
            }}> Cancel </Button>
          </Stack>
          )}
    </>
    
  </Stack>
  )
}
export default ContractList;