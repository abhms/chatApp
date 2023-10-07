// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" className="Navbar-Color">
      <Toolbar>
        <Typography variant="h6" className="chatKaro">
          <Link href="/" passHref>
            <span className="chatfire">C</span>
            <span className="chatfire">h</span>
            <span className="chatfire">a</span>
            <span className="chatfire">t</span>
            <span className="chatfire">F</span>
            <span className="chatfire">i</span>
            <span className="chatfire">r</span>
            <span className="chatfire">e</span>
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
