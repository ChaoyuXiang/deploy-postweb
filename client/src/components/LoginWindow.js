import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';
// require ('dotenv').config();


class LoginWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'admin',
            clientId: process.env.REACT_APP_GOOGLE_ID,
            userID: "",
        }
    }

    // handledb = (user) => {
    //     axios.get('api/users/'.concat(user))
    //         .then((res) => {
    //             if (res.data.length === 0) {
    //                 const reqUser = {
    //                     userName: user
    //                 }
    //                 axios.post('/api/users/add', reqUser)
    //                     .then(res => {
    //                         console.log("Add a new user");
    //                         this.props.setUserId(res.data._id);
    //                     })
    //             }
    //             else {
    //                 console.log("old user");
    //                 console.log(res.data[0]._id);
    //                 this.props.setUserId(res.data[0]._id);
    //             }
    //         })
    // }


    handleClick = () => {
        this.props.setUser(this.state.user);
        this.props.loading();
        axios.get('api/users/'.concat(this.state.user))
            .then((res) => {
                if (res.data.length === 0) {
                    const reqUser = {
                        userName: this.state.user
                    }
                    axios.post('/api/users/add', reqUser)
                        .then(res => {
                            console.log("Add a new user");
                            this.props.setUserId(res.data._id);
                        })
                }
                else {
                    console.log("old user");
                    console.log(res.data[0]._id);
                    this.props.setUserId(res.data[0]._id);
                }
            })
    }

    handleText = (event) => {
        this.setState({ user: event.target.value })
    }


    handleGoogle = (response) => {
        this.props.loading();
        console.log(response.profileObj);
        if (response.profileObj) {
            const user = `${response.profileObj.givenName} ${response.profileObj.familyName}`;
            console.log(user);
            this.props.setUser(user);
            axios.get('/api/users/'.concat(user))
            .then((res) => {
                console.log(res);
                if (res.data.length === 0) {
                    const reqUser = {
                        userName: user
                    }
                    axios.post('/api/users/add', reqUser)
                        .then(res => {
                            this.props.setUserId(res.data._id);
                        })
                }
                else {
                    this.props.setUserId(res.data[0]._id);
                }
            })
            
        }
    }

    render() {
        let loading = this.props.load;
        let result;
        if(!loading){
            result = <div className='main'>
                <h3 className="subtitle">Start here</h3>
                <input id="user-id" placeholder="id here" onChange={this.handleText}></input>
                <button id="id-submit" className="button" onClick={this.handleClick}>
                    Sign up</button>
                <GoogleLogin className="signInButton"
                    clientId={this.state.clientId}
                    buttonText='Or sign in with Google'
                    onSuccess={this.handleGoogle}
                    onFailure={this.handleGoogle}
                    cookiePolicy={'single_host_origin'}
                />  
            </div>
        } else {
            result = <Redirect to = '/posts'/>
        }

        return (
            <div>{result}</div>
        )

       
    }
}

const mapStateToProps = (state) => {
    return {
      userID: state.userID,
      load: state.load,
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch({ type: 'SET_USER', id: user }),
        setUserId: (userID) => dispatch({ type: 'SET_ID', id: userID }),
        loading:()=> dispatch({type:'LOADING'}),
    }
}

export default withRouter(connect((mapStateToProps), (mapDispatchToProps))(LoginWindow));