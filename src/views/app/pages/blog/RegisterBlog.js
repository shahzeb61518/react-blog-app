/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
  Badge,
  Pagination,
  Button,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import { NavLink, withRouter } from "react-router-dom";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import AppLayout from "../../../../layout/AppLayout";
import {
  Separator,
  Colxx,
} from "../../../../components/common/CustomBootstrap";
import { blogData } from "../../../../data/blog";
import ApiManager from "../../../../helpers/ApiManger";
import { reactLocalStorage } from "reactjs-localstorage";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const RegisterBlog = (props) => {
  const [blogData, setBlogData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [followerData, setFollowerData] = useState([]);
  const [followerArray, setfollowerArray] = useState([]);

  useEffect(() => {
    check();
    getBlogs();
  }, []);

  const check = () => {
    let user = reactLocalStorage.get("user_data");
    if(user){
      user = JSON.parse(user);
      }    console.log("user>>>>", user);
    setUserId(user.userId);
    setUserName(user.namef);
    getFollower(user.userId);
  };

  const getBlogs = async () => {
    await new ApiManager().getBlogs().then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }

        if (result.data) {
          setBlogData(result.data.list);
        }

        console.log("result>>>", result);
      }
    });
  };

  const registerBlog = async () => {
    await new ApiManager()
      .registerBlog(title, description, image, userId, userName, followerArray)
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
            props.history.push("/blog");
            console.log("result after adding>>>", result);
          }
        }
      });
  };

  const getFollower = (id) => {
    new ApiManager().getFollowing(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          let arr = [];
          result.data.forEach((ele) => {
            arr.push(ele.followerId);
          });
          //   setFollowerData(result.data);
          setfollowerArray(arr);
          console.log("followerArray>>>", arr);
        }
        console.log("followingresult>>>", result);
      }
    });
  };

  return (
    <>
      <AppLayout>
        <Row>
          <Col></Col>
          <Col sm={8}>
            <Card
              style={{
                padding: "50px",
                paddingLeft: "100px",
                paddingRight: "100px",
              }}>
              <FormGroup>
                <Label for='title'>Title</Label>
                <Input
                  type='text'
                  name='title'
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  id='title'
                  placeholder='Title'
                />
              </FormGroup>

              <FormGroup>
                <Label for='image'>Attach Image</Label>
                <Input
                  type='file'
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                  }}
                />
              </FormGroup>

              <FormGroup>
                <Label for='description'>Description</Label>
                <Input
                  style={{
                    minHeight: "150px",
                  }}
                  type='textarea'
                  name='description'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  id='description'
                  placeholder='description'
                />
              </FormGroup>

              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  textAlign: "center",
                }}>
                <Button
                  color='primary'
                  style={{
                    width: "100px",
                  }}
                  onClick={() => {
                    props.history.push("/blog");
                  }}>
                  Back
                </Button>
                <Button
                  color='primary'
                  style={{
                    marginLeft: "10px",
                    width: "200px",
                  }}
                  onClick={() => {
                    registerBlog();
                  }}>
                  Save
                </Button>
              </div>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </AppLayout>
    </>
  );
};

export default withRouter(RegisterBlog);
