import { combineReducers } from 'redux';


const initialPost = [{
	id: 1,
	feeling: "🥰",
	date: '2020-05-30',
	content: "this is a test",
	pop: false
}, {
	id: 2,
	feeling: "🥱",
	date: '2020-05-30',
	content: 'jfsjfisjfisjsosogjsjgosijgiosdjgsijgisgjsigjigjsgiojgj',
	pop: false
},
{
	id: 3,
	feeling: "🥱",
	date: '2020-05-30',
	content: 'jj',
	pop: false
}];

const getIndex = (posts,id)=>{
	const idx = posts.findIndex(function (onePost) {
        return onePost.id === id;
	})
	return idx;
}

const handlePost = (posts = initialPost, action) => {
	if(action.type === 'INITIAL'){
		return action.posts;
	}
	else if (action.type === 'SHOW_POPUP') {
		return posts.map(onePost =>
			onePost.id === action.id ? { ...onePost, pop: true } : onePost
		);
	}
	else if (action.type === 'HIDE_POPUP') {
		return posts.map(onePost =>
			onePost.id === action.id ? { ...onePost, pop: false } : onePost
		);
	}
	else if (action.type === 'DELETE') {
		let newArray = posts.slice();
		const idx = newArray.findIndex(function (onePost) {
			return onePost.id === action.id;
		});
		newArray.splice(idx, 1);
		return newArray;
	}
	else if (action.type === 'ADD') {
		let newArray = posts.slice();
  		newArray.push(action.post);
		return newArray;
	}
	else if (action.type === 'UPDATE') {
		console.log('reach here');
		return posts.map(onePost=>{
			console.log('reach here--' + action.post);
			if(onePost.id === action.post.postID){
				console.log('reach here');
				console.log(action.post);
				return {
					...onePost,
					content: action.post.content,
					feeling:action.post.feeling,
					date:action.post.date,
				}
			}
			else return onePost;
		})
	}
	else return posts;
};

const handleUser = (user = "",action) =>{
	if (action.type === 'SET_USER'){
		return action.id;
	}
	return user;
}


const handleUserID = (userID ="admin",action)=>{
	if(action.type === 'SET_ID'){
		return action.id;
	}
	else return userID;
}

const handleLoad = (load = false, action)=>{
	if(action.type ==='LOADING'){
		return true;
	}
	else if(action.type ==='FINISHED'){
		return false;
	}
	else return load;
}



export default combineReducers({
	posts : handlePost,
	user: handleUser,
	userID: handleUserID,
	load: handleLoad,
});
