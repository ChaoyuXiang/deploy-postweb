
export const setUser = (id) =>{
    return {
        type: 'SET_USER',
        id
    }
}

export const showPopup = id =>{
    return {
        type : 'SHOW_POPUP',
        id
    }
}

export const hidePopup = id =>{
    return {
        type : 'HIDE_POPUP',
        id
    }
}

export const submitPost = post=>{
    return {
        type : 'ADD',
        post
    }
}

export const deletePost = id=>{
    return {
        type : 'DELETE',
        id
    }
}

export const initial = (posts) =>{
    return {
        type : 'INITIAL',
        posts
    }
}

export const setUserID = id =>{
    return {
        type : 'SET_ID',
        id
    }
}

export const loadLogin = () =>{
    return {
        type : 'LOADING',
    }
}

export const finishLogin = () =>{
    return {
        type : 'FINISHED',
    }
}

export const updatePost = (post) =>{
    return {
        type : 'UPDATE',
        post
    }
}

