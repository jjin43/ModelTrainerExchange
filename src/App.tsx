import Footer from './components/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import { AllWalletsProvider } from './services/wallets/AllWalletsProvider';
import AppRouter from './AppRouter';
import colorBackground from './assets/colors.png';
import { theme } from './theme';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Trainer from './pages/Trainer';
import Contractor from './pages/Contractor';
import ContractList from './pages/ContractList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AllWalletsProvider>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#222222',
            backgroundImage: `url(${colorBackground})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          <header>
            <NavBar />
          </header>
          <Box
            flex={1}
            p={3}
          >
            <Routes>
              <Route path="/Contractor" element={<Home/>}></Route>
              <Route path="/Trainer" element={<Trainer/>}></Route>
              <Route path="/" element={<Contractor/>}></Route>
              <Route path="/ContractList" element={<ContractList/>}></Route>
            </Routes>
          </Box>
          <Footer />
        </Box>
      </AllWalletsProvider>
    </ThemeProvider>
  );
}

export default App;