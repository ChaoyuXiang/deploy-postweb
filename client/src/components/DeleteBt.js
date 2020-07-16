import React from 'react';
import { connect } from 'react-redux';
import {deletePost} from '../actions';
import axios from 'axios';

class DeleteBt extends React.Component {

    handleDelete = ()=>{
        this.props.deletePost(this.props.id);
        axios.delete('/api/posts/'.concat(this.props.id))
        .then(res=> console.log('successfully deleted'));
    }
    render(){
        return (
            <button className = 'post-button' onClick = {this.handleDelete}>x</button>
        )
    }
}

const mapStateToProps = (state) => { //name is by convention
	return { posts: state.posts}; //now it will appear as props
}


export default connect((mapStateToProps),{deletePost})(DeleteBt);