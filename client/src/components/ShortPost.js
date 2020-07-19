import React from 'react';
import {showPopup} from '../actions';
import { connect } from 'react-redux';
import DeleteBt from './DeleteBt';

class ShortPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked : false
        }
        console.log(this.props.pop)
    }

    
    render() {
        return (
            <div className = 'one-post'>
            <DeleteBt id = {this.props.id}/> <button className = 'post-button' onClick = {()=>this.props.showPopup(this.props.id)}>v</button>
            <p>--{this.props.date} - {this.props.feeling}
            </p>
            
            </div>
        )
    }
}

const mapStateToProps = (state) => { //name is by convention
	return { posts: state.posts}; //now it will appear as props
}


export default connect((mapStateToProps),{showPopup})(ShortPost);
