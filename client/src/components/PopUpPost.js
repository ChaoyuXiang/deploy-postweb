import React from 'react';
import { connect } from 'react-redux';
import DeleteBt from './DeleteBt';
import axios from 'axios';

class PopUpPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            feeling: 'admin',
            content: 'admin',
        }
    }

    generatePost = () => {
        let newPost = {
            postID: this.props.post.id,
            feeling: this.state.feeling,
            date: new Date().toISOString(),
            content: this.state.content,
        }
        return newPost;
    }

    editPost = () => {
        let curr = this.state.edit;
        if (curr) {
            let newPost = this.generatePost();
            axios.put('/api/posts/update', newPost)
                .then(res => {
                    console.log(res);
                    let changedPost = {
                        postID: this.props.post.id,
                        feeling: this.state.feeling,
                        date: res.data.date.substring(0, 10),
                        content: this.state.content,
                    };
                    console.log(changedPost);
                    this.props.updatePost(changedPost);
                })
        }
        this.setState(prevState => ({
            edit: !prevState.edit
        }));

    }

    render() {
        return (
            <div className='pop-post' style={{ display: this.props.post.pop ? 'block' : 'none' }}>
                <button className='post-button' onClick={() => this.props.hidePopup(this.props.post.id)}>-</button>
                <DeleteBt id={this.props.post.id} />
                <button className='post-button' onClick={() => this.editPost()}>{this.state.edit ? 'Save' : 'Edit'}</button>
                {this.state.edit ?
                    <div>
                        <textarea className='post-edit'
                                  onChange={(e) => this.setState({ feeling: e.target.value })}
                                  >{this.props.post.feeling}</textarea>
                        <textarea className='post-edit' 
                                  
                                  onChange={(e) => this.setState({ content: e.target.value })}>
                                  {this.props.post.content}</textarea>
                    </div> :
                    <div>
                        <p className='post-content'>{this.props.post.date} - {this.props.post.feeling}</p>
                        <p className='post-content'>{this.props.post.content}</p>
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => { //name is by convention
    return {
        post: state.posts.filter((onePost) => {
            return onePost.pop;
        })[0] || {
            id: 0,
            feeling: "",
            date: '2020-05-30',
            content: 'wait',
            pop: false
        },
        currUser: state.userID,
        posts:state.posts,
    }; 
}

const mapDispatchToProps = (dispatch) => {
    return {
        hidePopup: (id) => dispatch({ type: 'HIDE_POPUP', id: id }),
        updatePost: (post) => dispatch({ type: 'UPDATE', post: post }),
    }
}

export default connect((mapStateToProps),(mapDispatchToProps))(PopUpPost);