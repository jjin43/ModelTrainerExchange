import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import HBARLogo from "../assets/hbar-logo.svg";
import { useWalletInterface } from '../services/wallets/useWalletInterface';
import { WalletSelectionDialog } from './WalletSelectionDialog';
import { Link, Route, Router, Routes, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { accountId, walletInterface } = useWalletInterface();

  const handleConnect = async () => {
    if (accountId) {
      walletInterface.disconnect();
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (accountId) {
      setOpen(false);
    }
  }, [accountId])



  return (
    <AppBar position='relative'>
          
      <Toolbar>
        <Stack
          direction='row'
          gap={2}
          alignItems='center'
        >
          <Link to="/"><Button variant='outlined'>Contractor</Button></Link>
          <Link to="/Trainer"><Button variant='outlined'>Trainer</Button></Link>
        </Stack>
        {/* <img src={HBARLogo} alt='An upper case H with a line through the top' className='hbarLogoImg' />
        <Typography variant="h6" color="white" pl={1} noWrap>
          Happy Building
        </Typography> */}
        <Button
          variant='contained'
          sx={{
            ml: "auto"
          }}
          onClick={handleConnect}
        >
          {accountId ? `Connected: ${accountId}` : 'Connect Wallet'}
        </Button>
      </Toolbar>
      <WalletSelectionDialog open={open} onClose={() => setOpen(false)} />
    </AppBar>
  )
}