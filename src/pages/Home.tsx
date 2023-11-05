import { AccountId, ContractId, TokenId, Client, PrivateKey } from "@hashgraph/sdk";
import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import SendIcon from '@mui/icons-material/Send';
import { useContext, useEffect, useState } from "react";
import {sendHbar} from "../services/haderaTransfer/haderaTransfer"
import { MetamaskContext } from "../contexts/MetamaskContext";
import Trainer from "./Trainer";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { ContractContext } from "../contexts/ContractContex";

export default function Home() {
  const { walletInterface } = useWalletInterface();
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState(1);
  const [html, setHtml] = useState<any | null>(null);

  if (!process.env.REACT_APP_MY_ACCOUNT_ID || !process.env.REACT_APP_MY_PRIVATE_KEY) {
    throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
  }
  const myAccountId = AccountId.fromString(process.env.REACT_APP_MY_ACCOUNT_ID);
  const myPrivateKey = PrivateKey.fromString(process.env.REACT_APP_MY_PRIVATE_KEY);
  const { metamaskAccountAddress } = useContext(MetamaskContext);
  const {contractStatus, setContractStatus} = useContext(ContractContext);

  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);
  let navigate = useNavigate()
  useEffect(() => {
      setContractStatus('Public')
  }, [setContractStatus])



  return (
    <Stack alignItems="center" spacing={4}>
      <Typography
        variant="h4"
        color="white"
      >
        New Model Trainer Contract
      </Typography>
      {walletInterface !== null && (
        <>
          
          <Stack
            direction='row'
            gap={2}
            alignItems='center'
          >
            <Typography>
              Award:
            </Typography>
            <TextField
              type='number'
              label='amount in HBars'
              // value={amount}
              // onChange={(e) => setAmount(parseInt(e.target.value))}
            />
            <Typography>
              Password Protection:
            </Typography>
            <TextField
              //value={toAccountId}
              // onChange={(e) => setToAccountId(e.target.value)}
              label='N/A'
            />
            
          </Stack>
          <Stack
            direction='row'
            gap={2}
            alignItems='center'
          >
            <Typography>Upload Data/Model:</Typography>
            <input id="fileSelect" type="file" ></input>
          </Stack>
          <Typography>OR</Typography>
          <Stack
            direction='row'
            gap={2}
            alignItems='center'
          >
            <Typography>Enter File Address:</Typography>
            <TextField
              // value=
              label='file address'
            />
          </Stack>
          <Button variant="outlined" onClick={async () =>{   
              setContractStatus('Public')           
              const txId = await walletInterface.transferHBAR(AccountId.fromString(myAccountId.toString()), 10);
              navigate('/');
              alert('Success! \nCreated New Contract Iris-Model with 10.00 HBar Award')

            }}> Submit New Contract </Button>

        </>
      )}
    </Stack>
  )
}