import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, InputAdornment, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAuthUser } from './redux/action/loginCred';
import {Visibility,VisibilityOff} from '@mui/icons-material'

export default function SignInComp() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword,setShowPassword] = useState(false)
    const [validating,setValidating] = useState(false)
    const staticUserData = useSelector(state => state.userCred)
    console.log("staticUserData",staticUserData);
    
    
    const handleSetShow = () => {
      setShowPassword((show) => !show)

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setValidating(true)
        setTimeout(() => {
          if(staticUserData.username === username && staticUserData.password === password) {
              setValidating(false)
              navigate('/')
              dispatch(checkAuthUser(true))
              localStorage.setItem("isValidUser", "true");
          } else {
            setValidating(false)
              setError('Invalid User')
              dispatch(checkAuthUser(false))
              // localStorage.setItem("isValidUser", "false");
          }
        },3000) //adding 3sec delay to feel the user experience better
        
console.log("handleSubmit",e);

    }
    return (
        <>
         <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#fAfAfA', 
      }}
    >
         <Container component="main" maxWidth="xs">
         <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
            backgroundColor: 'white',
        }}
      >
       <Typography variant="h5">Sign In</Typography>
       <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">
                <IconButton
                  onClick={handleSetShow}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
              },
            }}
            

          />
          
          {error && <Typography color="error" variant="body2">{error}</Typography>}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} loading={validating}>
                Login
          </Button>
        </form> 
      </Box>
         </Container>
         </Box>
        </>
    )
}