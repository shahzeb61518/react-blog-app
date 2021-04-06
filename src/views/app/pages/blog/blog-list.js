/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardBody,
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

const BlogList = (props) => {
  const [blogData, setBlogData] = useState([]);
  const [creatorBlogData, setCreatorBlogData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    check();
    // getBlogs();
  }, []);

  const check = async () => {
    let user = await reactLocalStorage.get("user_data");
    console.log(user);
    user = JSON.parse(user);
    setUserId(user.userId);
    setUserName(user.namef);
    setUserRole(user.role);

    if (user.role === "creator") {
      getBlogsByCreatorId(user.userId);
    } else {
      getBlogsByUserId(user.userId);
    }
  };

  const getBlogsByCreatorId = async (id) => {
    await new ApiManager().getBlogsByCreatorId(id).then((result) => {
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

  const getBlogsByUserId = async (id) => {
    await new ApiManager().getBlogsByUserId(id).then((result) => {
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

  return (
    <>
      <AppLayout>
        <Row>
          <Colxx xxs='12'>
            {userRole == "creator" ? (
              <Button
                color='primary'
                style={{
                  marginBottom: "20px",
                  width: "200px",
                }}
                onClick={() => {
                  props.history.push("/blog/register");
                }}>
                Add Blog
              </Button>
            ) : undefined}

            <br />
            <h2>Blogs</h2>
            <br />
          </Colxx>
          {blogData.length !== 0 ? (
            blogData.map((blogItem, index) => {
              return (
                <Colxx xxs='12' lg='6' className='mb-5' key={index}>
                  <Card
                    onClick={() => {
                      props.history.push("/blog/detail", {
                        blogData: blogItem,
                      });
                    }}
                    className='flex-row listing-card-container'>
                    {blogItem.blogImage ? (
                      <div className='w-40 position-relative'>
                        <img
                          className='card-img-left'
                          src={blogItem.blogImage}
                          alt='Card cap'
                        />
                      </div>
                    ) : undefined}

                    <div className='w-60 d-flex align-items-center'>
                      <CardBody>
                        <ResponsiveEllipsis
                          className='mb-3 listing-heading'
                          text={blogItem.blogTitle}
                          maxLine='2'
                          trimRight
                          basedOn='words'
                          component='h5'
                        />
                        <ResponsiveEllipsis
                          className='listing-desc text-muted'
                          text={blogItem.blogDescription}
                          maxLine='3'
                          trimRight
                          basedOn='words'
                          component='p'
                        />
                        <p>{blogItem.userName}</p>
                      </CardBody>
                    </div>
                  </Card>
                </Colxx>
              );
            })
          ) : (
            <div
              style={{
                width: "100%",
                textAlign: "center",
              }}>
              <h5>No Blog posted yet...</h5>
            </div>
          )}
        </Row>
        {/* <Row>
        <Colxx xxs="12">
          <Pagination listClassName="justify-content-center">
            <PaginationItem>
              <PaginationLink className="prev" href="#">
                <i className="simple-icon-arrow-left" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="next" href="#">
                <i className="simple-icon-arrow-right" />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Colxx>
      </Row> */}
      </AppLayout>
    </>
  );
};

export default withRouter(BlogList);
