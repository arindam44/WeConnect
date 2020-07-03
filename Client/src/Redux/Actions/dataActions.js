import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  ADD_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  SET_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../Types";
import axios from "axios";

export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

export const likePost = (postId) => (dispatch) => {
  fetch(`/post/${postId}/like`, {
    method: "GET",
    headers: {
      Authorization: localStorage.IdToken,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: res });
    })
    .catch((err) => console.log(err));
};

export const unlikePost = (postId) => (dispatch) => {
  fetch(`/post/${postId}/unlike`, {
    method: "GET",
    headers: {
      Authorization: localStorage.IdToken,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch({ type: UNLIKE_POST, payload: res });
    })
    .catch((err) => console.log(err));
};

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`, {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const addPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log("before axios...." + newPost.body);
  axios
    .post("/post", newPost, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log("axios then");
      dispatch({ type: ADD_POST, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(postId);
  axios
    .get(`/post/${postId}`, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data.comments);
      dispatch({ type: SET_POST, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const addComment = (postId, body) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, body, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
