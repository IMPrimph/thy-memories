import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, LIKE, START_LOADING, UPDATE, COMMENT } from "../constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case END_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            }
        case CREATE:
            return {...state, posts: [...state, action.payload]};
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload
                    }
                    return post;
                })
            };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload)};
        default:
            return state
    }
}