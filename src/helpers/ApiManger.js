import axios from "axios";
// import { LocalStorage } from "./LocalStorage";

// let user = new LocalStorage().getUserData();
// user = JSON.parse(user);

export default class ApiManager {
  //   userId = user.userId;
  //   userName = user.name;

  // LocalHost
  // _BASE_URL = "http://localhost:4001/api/";
  _BASE_URL = "https://uvuew-node.herokuapp.com/api/";

  _PAYMENT = "pay/payment";

  //USERS
  _USER_SIGNUP = "users/create";
  _USER_LOGIN = "users/login";
  _USER_UPDATE = "users/update";
  _USER_GET_BY_ID = "users/get-by-id";
  _USER_GET = "users/get";
  _USER_LOGIN_WITH_GOOGLE = "users/login-with-google";

  _USER_GET_PRE_CHAT = "chat/get-pre-chat";

  _USER_FOLLOW = "followers/create";
  _USER_GET_FOLLOWERS = "followers/get-by-follower-id";
  _USER_GET_FOLLOWing = "followers/get-by-following-id";
  _USER_GET_CHAT_USERS = "followers/get-chat-users";
  _USER_UPDATE_FOLLOWER_READ = "followers/update-read";

  // BLOG
  _ADD_BLOG = "blog/create";
  _GET_BLOG = "blog/get";
  _DELETE_BLOG = "blog/delete";
  _GET_BLOG_BY_ID = "blog/get";
  _GET_BLOG_BY_CREATOR_ID = "blog/get-by-creator-id";
  _GET_BLOG_BY_USER_ID = "blog/get-by-user-id";

  // Comments
  _ADD_COMMENTS = "comments/create";
  _GET_COMMENTS = "comments/get";
  _DELETE_COMMENTS = "comments/delete";
  _GET_COMMENTS_BY_BLOG_ID = "comments/get-by-blog-id";

  async sendPostRequest(_url, _params, headers) {
    _url = this._BASE_URL + _url;
    console.log("API _url", _url);

    if (!_params) {
      _params = {};
    }
    if (!headers) {
      headers = {
        "Content-Type": "application/json",
      };
    }

    try {
      let response = await axios({
        method: "post",
        url: _url,
        headers: headers,
        data: _params,
        timeout: 50000,
      });
      console.log("API call response", response);
      return response;
    } catch (error) {
      let err = [];
      err.error = error;
      err.no_result = true;
      console.log("catch error on ", _url, " call fail", err);
      setTimeout(() => {
        alert("Unable to connect with server");
      }, 400);
      return err;
    }
  }

  payment(token, products) {
    let url = this._PAYMENT;
    let data = {
      token: token,
      products: products,
    };
    return this.sendPostRequest(url, data, this.headers);
  }

  //USER FUNCTIONS
  //SingUp
  singUp(name, email, password, role) {
    let url = this._USER_SIGNUP;
    let userData = {
      userName: name,
      userEmail: email,
      userPassword: password,
      userRole: role,
    };
    // console.log("data for adding>>>>>", userData);
    return this.sendPostRequest(url, userData, this.headers);
  }

  updateUser(
    id,
    profileImage,
    userName,
    userEmail,
    aboutMe,
    location,
    creditCard,
    emailVerify,
    facebook,
    twitter,
    instagram
  ) {
    let url = this._USER_UPDATE;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("userEmail", userEmail);
    formData.append("userName", userName);
    formData.append("profileImage", profileImage);
    formData.append("aboutMe", aboutMe);
    formData.append("location", location);
    formData.append("creditCard", creditCard);
    formData.append("emailVerify", emailVerify);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);

    // let data = {
    //   id: id,
    //   userEmail: userEmail,
    //   userName: userName,
    //   profileImage: profileImage,
    //   aboutMe: aboutMe,
    //   location: location,
    //   creditCard: creditCard,
    //   emailVerify: emailVerify,
    //   userPassword: userPassword,
    // }
    return this.sendPostRequest(url, formData, this.headers);
  }

  //SignIn
  signIn(email, password) {
    let url = this._USER_LOGIN;

    let userData = {
      userEmail: email,
      userPassword: password,
    };
    return this.sendPostRequest(url, userData, this.headers);
  }

  loginWithGoogle(name, email, token) {
    let url = this._USER_LOGIN_WITH_GOOGLE;

    let userData = {
      name: name,
      email: email,
      token: token,
    };
    return this.sendPostRequest(url, userData, this.headers);
  }

  getUsers(id) {
    let url = this._USER_GET;
    let data = {
      id: id,
    };
    // console.log("getting user by id>>>>", id)
    return this.sendPostRequest(url, data, this.headers);
  }

  //User by ID
  userById(id) {
    let url = this._USER_GET_BY_ID;
    let userId = { id: id };
    // console.log("getting user by id>>>>", id)
    return this.sendPostRequest(url, userId, this.headers);
  }

  follow(
    followerId,
    followerName,
    followerImage,
    followingId,
    followingName,
    followingImage
  ) {
    let url = this._USER_FOLLOW;
    let data = {
      followerId: followerId,
      followerName: followerName,
      followerImage: followerImage,
      followingId: followingId,
      followingName: followingName,
      followingImage: followingImage,
    };
    console.log("adading data>>>>", data);

    return this.sendPostRequest(url, data, this.headers);
  }

  updateFollowerRead(id, read) {
    let url = this._USER_UPDATE_FOLLOWER_READ;
    let data = {
      id: id,
      read: true,
    };
    return this.sendPostRequest(url, data, this.headers);
  }

  getFollowers(id) {
    let url = this._USER_GET_FOLLOWERS;
    let userId = { followerId: id };
    // console.log("getting foloower by id>>>>", id);
    return this.sendPostRequest(url, userId, this.headers);
  }
  getFollowing(id) {
    let url = this._USER_GET_FOLLOWing;
    let data = { followingId: id };
    // console.log("getting folowing by id>>>>", id);
    return this.sendPostRequest(url, data, this.headers);
  }
  getChatUsers(id) {
    let url = this._USER_GET_CHAT_USERS;
    let data = { followingId: id };
    // console.log("getting chat users by id>>>>", id);
    return this.sendPostRequest(url, data, this.headers);
  }
  getPreChat(fromId, toId) {
    let url = this._USER_GET_PRE_CHAT;
    let data = { fromId: fromId, toId: toId };
    console.log("getting pre chat >>>", data);
    return this.sendPostRequest(url, data, this.headers);
  }

  // BLOG FUNCTIONS
  registerBlog(
    blogTitle,
    blogDescription,
    blogImage,
    userId,
    userName,
    followerArray
  ) {
    let url = this._ADD_BLOG;
    var json_arr = JSON.stringify(followerArray);

    const formData = new FormData();
    formData.append("blogTitle", blogTitle);
    formData.append("blogDescription", blogDescription);
    formData.append("blogImage", blogImage);
    formData.append("userId", userId);
    formData.append("userName", userName);
    formData.append("followerArray", json_arr);
    // console.log("formDataformData>>>>>", formData);
    return this.sendPostRequest(url, formData, this.headers);
  }

  // Get blog List
  getBlogs() {
    let url = this._GET_BLOG;
    return this.sendPostRequest(url, this.headers);
  }

  getBlogsByUserId(id) {
    let data = {
      id: id,
    };
    let url = this._GET_BLOG_BY_USER_ID;
    return this.sendPostRequest(url, data, this.headers);
  }

  getBlogsByCreatorId(id) {
    let url = this._GET_BLOG_BY_CREATOR_ID;
    let data = { userId: id };
    // console.log("get data by>>>>", id);
    return this.sendPostRequest(url, data, this.headers);
  }

  registerComment(comment, commentBlogId, commentUserId, commentUserName) {
    let url = this._ADD_COMMENTS;
    let data = {
      comment: comment,
      commentBlogId: commentBlogId,
      commentUserId: commentUserId,
      commentUserName: commentUserName,
    };
    // console.log("adding data>>>>", data);
    return this.sendPostRequest(url, data, this.headers);
  }
  // Get Comments List
  getCommentsByBlogId(id) {
    let url = this._GET_COMMENTS_BY_BLOG_ID;
    let data = { commentBlogId: id };
    // console.log("getting by id>>>>", id);
    return this.sendPostRequest(url, data, this.headers);
  }

  //   // Deleting Wish
  //   deleteWish(id) {
  //     console.log("delete this id>>>>", id);
  //     let wishId = { id: id };
  //     let url = this._DELETE_WISH;
  //     return this.sendPostRequest(url, wishId, this.headers);
  //   }
}
