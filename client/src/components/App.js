import React from 'react';
import Header from './Header';
import LoginWindow from './LoginWindow';
import Footer from './Footer';
import './Login.css';
import './mpStyle.css';
import PostPage from './PostPage';
import PopUpPost from './PopUpPost';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const App = () => {   //this is how you make a functional component
  return (
    <Router>
      <Header />
      <Route path='/' exact component = {LoginWindow}/>
      <Route path='/posts' exact component = {PostPage}/>
      <PopUpPost/>
      <Footer />
    </Router>
  );
}

export default App;
