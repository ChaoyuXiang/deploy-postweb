import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class MenuBar extends React.Component {
    handleClick = ()=>{
        this.props.setUserID('admin');
        this.props.login();
    }
    render() {
        return (
            <div className="menu">
                <Link to = '/' className="login-page" onClick = {this.handleClick}>Login Page</Link>
                <p id="user">Current User: {this.props.user}</p>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
      user : state.user
    };
}

  const mapDispatchToProps = (dispatch) => {
    return {
        setUserID: (userID) => dispatch({ type: 'SET_ID', id: userID }),
        login:()=> dispatch({type:'FINISHED'}),
    }
}
  

export default withRouter(connect((mapStateToProps),(mapDispatchToProps))(MenuBar));