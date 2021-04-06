import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";

import {
  Row,
  Card,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Spinner,
  CardBody,
  Button,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
} from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import classnames from "classnames";
import GalleryDetail from "../../../../containers/pages/GalleryDetail";
import GalleryProfile from "../../../../containers/pages/GalleryProfile";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import SingleLightbox from "../../../../components/pages/SingleLightbox";
import whotoFollowData from "../../../../data/follow";
import UserFollow from "../../../../components/common/UserFollow";
import UserCardBasic from "../../../../components/cards/UserCardBasic";
import recentPostsData from "../../../../data/recentposts";
import RecentPost from "../../../../components/common/RecentPost";

import CommentWithLikes from "../../../../components/pages/CommentWithLikes";

import AppLayout from "../../../../layout/AppLayout";

import posts from "../../../../data/posts";
import Post from "../../../../components/cards/Post";
import ApiManager from "../../../../helpers/ApiManger";

const friendsData = whotoFollowData.slice();
const followData = whotoFollowData.slice(0, 5);

const ProfileSocial = (props) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [blogData, setBlogData] = useState({});
  const [blogId, setBlogId] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [commentsArr, setCommentsArr] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    let user = reactLocalStorage.get("user_data");
    user = JSON.parse(user);
    console.log("user>>>>", user);
    setUserId(user.userId);
    setUserName(user.namef);

    if (props.location.state) {
      if (props.location.state.blogData) {
        setBlogData(props.location.state.blogData);
        setBlogId(props.location.state.blogData._id);
        getComments(props.location.state.blogData._id);
      }
    }
  };

  const getComments = async (id) => {
    await new ApiManager().getCommentsByBlogId(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setCommentsArr(result.data.list);
          setIsLoading(false);
          setLoader(false);
          console.log("result after adding>>>", result);
        }
      }
    });
  };

  const registerComment = () => {
    setLoader(true);
    new ApiManager()
      .registerComment(comment, blogData._id, userId, userName)
      .then((result) => {
        if (result.no_result) {
          return;
        }
        if (result.data) {
          if (result.data.error) {
            alert(result.data.error);
            return;
          }

          if (result.data) {
            getComments(blogId);
            console.log("result after adding>>>", result);
          }
        }
      });
  };

  return (
    <>
      <AppLayout>
        <Row>
          <Colxx xxs='12'>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='profile'>
                <Row>
                  <Col></Col>
                  <Colxx xxs='10' lg='7' xl='8' className='col-right'>
                    <Card>
                      <div
                        style={{
                          marginTop: "30px",
                          paddingLeft: "30px",
                          paddingRight: "30px",
                        }}>
                        <h6
                          style={{
                            float: "left",
                            fontSize: "11px",
                            color: "grey",
                          }}>
                          Posted By: {blogData.userName}
                        </h6>
                        <h6
                          style={{
                            float: "right",
                            fontSize: "11px",
                            color: "grey",
                          }}>
                          {blogData.created_at
                            ? moment(blogData.created_at).fromNow()
                            : undefined}
                        </h6>
                      </div>

                      <CardBody style={{ paddingTop: "0px" }}>
                        <div className='d-flex flex-row mb-3'>
                          <img
                            style={{
                              width: "100%",
                            }}
                            src={blogData.blogImage}
                            alt='thumbnail'
                            className='img-fluid border-0 border-radius mb-3'
                          />
                        </div>
                        <div className=''>
                          <NavLink to='#' location={{}}>
                            <h1
                              className='font-weight-medium mb-0 '
                              style={{
                                background: "rgb(251 251 251)",
                                padding: "15px",
                                borderRadius: "10px",
                              }}>
                              {blogData.blogTitle}
                            </h1>
                            <p
                              style={{
                                fontSize: "14px",
                                marginTop: "20px",
                              }}
                              className='text-muted mb-0 text-small'>
                              {blogData.blogDescription}
                            </p>
                          </NavLink>
                        </div>
                        <br />
                        <br />
                        {/* <p>{data.detail}</p> */}
                        {/* {renderContent(data)} */}
                        {/* {renderLikeAndCommentCount(messages)} */}
                        {/* <div className="mt-5 remove-last-border">{renderComments(data)}</div> */}
                        {/* <CommentWithLikes data={blogData.blogDescription} />; */}

                        <div className='pl-3 flex-grow-1'>
                          {isLoading ? (
                            <div
                              style={{
                                textAlign: "center",
                              }}>
                              <Spinner
                                color='primary'
                                animation='border'
                                role='status'>
                                <span className='sr-only'>Loading...</span>
                              </Spinner>
                            </div>
                          ) : (
                            commentsArr &&
                            commentsArr.map((item, k) => {
                              return (
                                <Row
                                  key={k}
                                  style={{
                                    padding: "10px",
                                  }}>
                                  <Col
                                    sm={1}
                                    style={{
                                      paddingRight: "0px",
                                    }}>
                                    <img
                                      src={blogData.blogImage}
                                      alt='profile'
                                      className='img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall'
                                    />
                                  </Col>
                                  <Col
                                    sm={10}
                                    style={{
                                      paddingLeft: "0px",
                                    }}>
                                    <p className='font-weight-medium mb-0'>
                                      {item.commentUserName}
                                    </p>
                                    <p className='text-muted mb-0 text-small'>
                                      {item.comment}
                                    </p>
                                  </Col>
                                  <Col sm={1}></Col>
                                </Row>
                              );
                            })
                          )}
                        </div>
                        <br />
                        <InputGroup className='comment-container'>
                          <Input
                            value={comment}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                            placeholder='add a comment...'
                          />
                          <InputGroupAddon addonType='append'>
                            <Button
                              disabled={loader}
                              onClick={() => {
                                setComment("");
                                registerComment();
                              }}
                              color='primary'>
                              {loader ? (
                                <Spinner
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                  }}
                                  color='defualt'
                                  role='status'></Spinner>
                              ) : undefined}
                              <span className='d-inline-block'>Add</span>{" "}
                              <i className='simple-icon-arrow-right ml-2' />
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </CardBody>
                    </Card>

                    {/* {posts.map((itemData) => {
                      return (
                        <Post
                          data={itemData}
                          key={`post_${itemData.key}`}
                          className="mb-4"
                        />
                      );
                    })} */}
                  </Colxx>
                  <Col></Col>
                </Row>
              </TabPane>
            </TabContent>
          </Colxx>
        </Row>
      </AppLayout>
    </>
  );
};
export default withRouter(ProfileSocial);
