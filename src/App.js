import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import { Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';
<pre>{process.env.REACT_APP_GOOGLE_CLIENT_ID}</pre>

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Container maxWidth='xl'>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route path='/posts' exact component={Home} />
          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/:id' exact component={PostDetails} />
          <Route path='/auth' exact component={() => (!user ? <Auth/> : <Redirect to='/posts'/>)} />
        </Switch>
      </Container>
    </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App