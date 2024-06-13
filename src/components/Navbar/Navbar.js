import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const logOut = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img src={memoriesText} alt='icon' height='45px' />
                <img className={classes.image} src={memoriesLogo} alt='memories' height='40px' />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.name} src={user?.result?.picture}>
                            {user?.result?.name?.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>
                            {user?.result?.name}
                        </Typography>
                        <Button color='secondary' onClick={logOut} variant='contained' className={classes.logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} variant='contained' color='primary' to="/auth">
                        SignIn
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar