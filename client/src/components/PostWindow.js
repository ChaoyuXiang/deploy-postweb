import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const getTime = () => {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours}-${date.getMinutes}`;
}

class PostWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            happy: false,
            boring: false,
            sad: false,
            post: {}
        }
    }
    getFeeling = () => {
        let feeling = "";
        feeling += this.state.happy ? "😄" : "";
        feeling += this.state.boring ? "🥱" : "";
        feeling += this.state.sad ? "😟" : "";
        return feeling;
    }

    generatePost = () => {
        let newPost = {
            userID: this.props.currUser,
            feeling: this.getFeeling(),
            date: new Date().toISOString(),
            content: this.state.content,
        }

        return newPost;
    }

    handleText = (event) => {
        this.setState({ content: event.target.value });
    }

    handleState = (event) => {
        let stateValue = event.target.id;
        this.setState({
            [stateValue]: event.target.checked
        })
    }

    handleSubmit = () => {
        let newPost = this.generatePost();
        axios.post('/api/posts/add', newPost)
            .then(res => {
                this.setState({
                    post: {
                        id: res.data._id,
                        feeling: res.data.feeling,
                        content: this.state.content,
                        date: res.data.date.substring(0, 10),
                        pop: false
                    }
                });
                this.props.add(this.state.post);
            });
    }

    render() {
        return (
            <div className="post left">
                <textarea type="text" className="user-post" placeholder="How's your life today.."
                    onChange={this.handleText}></textarea>
                <div className="state">
                    <p>How are you feeling ?</p>
                    <div className="user-state">
                        <input type="checkbox" id="happy" onChange={this.handleState} />
                        <label></label>
                    </div>
                    <div className="user-state">
                        <input type="checkbox" id="boring" onChange={this.handleState} />
                        <label></label>
                    </div>
                    <div className="user-state">
                        <input type="checkbox" id="sad" onChange={this.handleState} />
                        <label></label>
                    </div>
                </div>
                <div className="submit">
                    <button className="post-submit" onClick={this.handleSubmit}>Submit</button>
                    <button className="post-clear">Clear</button>
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        currUser: state.userID
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: (post) => dispatch({ type: 'ADD', post: post }),
    }
}


export default connect((mapStateToProps), (mapDispatchToProps))(PostWindow);