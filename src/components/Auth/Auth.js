import React, { useState } from 'react'
import useStyles from './styles'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { signIn, signUp } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignup) {
            dispatch(signUp(formData, history))
            } else {
            dispatch(signIn(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const googleSuccess = async (res) => {
        try {
            const { name, picture, sub } = jwtDecode(res.credential);
            dispatch({ type: 'AUTH', data: { result: { name, picture, sub, googleId: sub }, token: res.credential } })
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    const googleFailure = () => {
        console.log('signin failed')
    }

    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>
                {isSignup ? 'SignUp' : 'SignIn'}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input
                                    name='firstName'
                                    label='First Name'
                                    handleChange={handleChange}
                                    half
                                />
                                <Input
                                    name='lastName'
                                    label='Last Name'
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    size='medium'
                    shape='pill'
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account ? Sign In' : 'Dont have an account? Sign Up' }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth