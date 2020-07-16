import React from 'react';
import ShortPost from './ShortPost';
import { connect } from 'react-redux';
import axios from 'axios';



class AllPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Your post history :',
            loading: true
        }
    }

    componentDidMount = () => {
        axios.get('/api/posts/'.concat(this.props.userID))
            .then(res => {
                console.log(res);
                if (res.data.length > 0) {
                    this.setState({
                        posts: res.data.map(onePost => ({
                            id: onePost._id,
                            feeling: onePost.feeling,
                            content: onePost.content,
                            date: onePost.date.substring(0, 10),
                            pop: false
                        })),
                    });
                    this.props.initial(this.state.posts);
                }
            })
    }

    render() {
        return (
            <div className='right'>
                <p className='post-title'>{this.state.title}</p>
                <div className = 'all-posts'> {this.props.posts.map(post => (
                    <ShortPost id={post.id} feeling={post.feeling}
                        date={post.date} content={post.content} pop={post.pop} key={post.id} />
                ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => { //name is by convention
    return {
        posts: state.posts,
        userID: state.userID
    }; //now it will appear as props
}

// export default connect(mapStateToProps)(AllPosts);

const mapDispatchToProps = (dispatch) => {
    return {
        initial: (posts) => dispatch({ type: 'INITIAL', posts: posts }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);