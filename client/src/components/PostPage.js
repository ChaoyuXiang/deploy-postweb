import React from 'react';
import './Login.css';
import './mpStyle.css';
import PostWindow from './PostWindow';
import AllPosts from './AllPosts';
import MenuBar from './MenuBar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from "@emotion/core";

class PostPage extends React.Component {
  
  override = css`
  display: block;
  border-color: red;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

  render() {
    let loading = this.props.userID === 'admin';
    let result;
    if (loading) {
      result = <BounceLoader size='100' color = '#FFA006' css = {this.override}/>;
    } else {
      result = <div style={{height:"60%"}}>
      <PostWindow />
      <AllPosts />;
      </div>
    }
    return (
      <div className='post-page'>
        <MenuBar user={this.props.user} />
        {result}
      </div>)
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    userID: state.userID
  };
}


export default withRouter(connect((mapStateToProps))(PostPage));
