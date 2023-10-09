import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link'; 
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} className="homeImg">
              <img
                src="/Images/chatApp.jpg"
                alt="Your Larger Image"
                style={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom>
                Welcome to Your ChatFire
              </Typography>
              <Typography variant="body1" paragraph>
                This chat application is encrypted and highly secure, ensuring your privacy.
              </Typography>
              <Typography variant="body1" paragraph>
                It provides end-to-end encryption to keep your conversations safe.
              </Typography>
              {/* Use the Link component for client-side navigation */}
              <Link href="/auth/signin">
                <Button variant="contained" color="primary" fullWidth className='sign-in-button'>
                  Sign In
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
