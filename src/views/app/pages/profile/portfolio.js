import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import ThumbnailImage from "./../../../../components/cards/ThumbnailImage";

import StripeCheckout from "react-stripe-checkout";

import {
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  Spinner,
  TabPane,
  Badge,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { NavLink, withRouter } from "react-router-dom";
import AddNewModal from "../../../../containers/pages/AddNewModal";
import classnames from "classnames";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import SingleLightbox from "../../../../components/pages/SingleLightbox";
import recentPostsData from "../../../../data/recentposts";
import RecentPost from "../../../../components/common/RecentPost";
import productData from "../../../../data/products";
import UserCardBasic from "../../../../components/cards/UserCardBasic";
import friendsData from "../../../../data/follow";
import ReactSelect from "../../../../containers/forms/ReactSelectExample";
import ReactSelect2 from "../../../../containers/forms/ReactSelectExample2";
import BlogList from "./../blog/blog-list-profile";
import ApiManager from "../../../../helpers/ApiManger";
import Chat from "./../../applications/chat";

// import img from "../../../../../public/assets/img/profiles/profile.png";

const products = productData.slice(0, 15);
const categories = [
  { label: "Cakes", value: "Cakes", key: 0 },
  { label: "Cupcakes", value: "Cupcakes", key: 1 },
  { label: "Desserts", value: "Desserts", key: 2 },
];

const ProfilePortfolio = (props) => {
  const [activeTab, setActiveTab] = useState("details");
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [image, setImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [location, setLocation] = useState("");
  const [creditCard, setCreditCard] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);

  const [usersData, setUsersData] = useState([]);

  const [followerId, setFollowerId] = useState("");
  const [followerName, setFollowerName] = useState("");
  const [followerImage, setFollowerImage] = useState("");

  const [followingId, setFollowingId] = useState("");
  const [followingName, setFollowingName] = useState("");

  const [followersLength, setFollowersLength] = useState(Number);
  const [followingLength, setFollowingLength] = useState(Number);
  const [newFollowersLength, setNewFollowersLength] = useState(Number);
  const [alreadyFollowerArr, setAlreadyFollowerArr] = useState([]);

  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [newFollowersData, setNewFollowersData] = useState([]);

  const [read, setRead] = useState(Boolean);

  const [chatUsers, setChatUsers] = useState([]);

  const [modal, setModal] = useState(false);
  const [followModal, setFollowModal] = useState(false);

  const [loadingUser, setloadingUser] = useState(true);
  const [labelSubscription, setlabelSubscription] = useState(
    "If you want to follow this person please subscribe..."
  );

  const [product, setProduct] = useState({
    name: "Purchase Subscription",
    price: 10,
    productBy: "Blog",
  });

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    let user = reactLocalStorage.get("user_data");
    user = JSON.parse(user);
    console.log("user>>>>", user);
    setUserId(user.userId);
    setUserRole(user.role);
    setUserName(user.namef);
    setUserImage(user.profileImage);
    getUser(user.userId);
    getFollowers(user.userId);
    getFollowing(user.userId);
    getAllUsers(user.userId);
    // getChatUsers(user.userId);
  };

  const getAllUsers = (id) => {
    new ApiManager().getUsers(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          let arr = result.data.list;
          arr = arr.filter((obj) => obj._id != id && obj.userRole != "user");

          setUsersData(arr);
          setloadingUser(false);
        }
        console.log("result user data>>>", result);
      }
    });
  };

  const getUser = (id) => {
    new ApiManager().userById(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          setUserData(result.data);
          let data = {
            namef: result.data.userName,
            role: result.data.userRole,
            userEmail: result.data.userEmail,
            userId: result.data._id,
            profileImage: result.data.profileImage,
          };
          let user_data = JSON.stringify(data);
          reactLocalStorage.set("user_data", user_data);
        }
        console.log("result user data>>>", result);
      }
    });
  };

  const followAdd = () => {
    new ApiManager()
      .follow(
        userId,
        userName,
        userImage,
        followerId,
        followerName,
        followerImage
      )
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
            if (
              result.data.message === "Your Are Already Following This Persone!"
            ) {
              setFollowModal(true);
            }
            // console.log("result user data>>>", result.data);
            getFollowers(userId);
            setActiveTab("following");

            // getFollowing(userId);
          }
          console.log("result>>>", result);
        }
      });
  };

  const AlreadyfollowingModal = (props) => {
    const toggle = () => setFollowModal(!followModal);
    return (
      <div>
        <Modal isOpen={followModal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Warning</ModalHeader>
          <ModalBody>
            <h4>Your Are Already Following This Persone!</h4>
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={() => {
                setFollowModal(false);
              }}>
              Ok
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const followAdd2 = (id, name, img) => {
    new ApiManager()
      .follow(userId, userName, userImage, id, name, img)
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
            // console.log("result user data>>>", result.data);
            getFollowers(userId);
            // getFollowing(userId);
          }
          console.log("result>>>", result);
        }
      });
  };

  // const updateNewFollower = (id, idd, name, img) => {
  //   new ApiManager().updateFollowerRead(id).then((result) => {
  //     if (result.no_result) {
  //       return;
  //     }
  //     if (result.data) {
  //       if (result.data.error) {
  //         alert(result.data.error);
  //         return;
  //       }
  //       if (result.data) {
  //         getFollowing(userId);
  //         followAdd2(idd, name, img);

  //         // console.log("result followers data>>>", result.data);
  //       }
  //       console.log("updateNewFollower>>>", result);
  //     }
  //   });
  // };

  const getFollowers = (id) => {
    new ApiManager().getFollowers(id).then((result) => {
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
            arr.push(ele.followingId);
          });
          setAlreadyFollowerArr(arr);

          setFollowersData(result.data);
          setFollowingLength(result.data.length);
          // console.log("result followers data>>>", result.data);
        }
        console.log("followersresult>>>", result);
      }
    });
  };

  const getFollowing = (id) => {
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
          setFollowingData(result.data);
          setFollowersLength(result.data.length);

          // let arrReadFalse = result.data.filter((ele) => ele.read == false);
          // let arrReadTrue = result.data.filter((ele) => ele.read == true);
          // setNewFollowersData(arrReadFalse);
          // setNewFollowersLength(arrReadFalse.length);
          // console.log("setNewFollowersData>>>", arrReadFalse);
          // console.log("setFollowersLength>>>", arrReadFalse.length);
          // setFollowingData(arrReadTrue);
          // setFollowersLength(arrReadTrue.length);
          // console.log("setFollowingData>>>", arrReadTrue);
          // console.log("setFollowersLength>>>", arrReadTrue.length);

          // console.log("result following data>>>", result.data);
        }
        console.log("followingresult>>>", result);
      }
    });
  };

  const onToken = (token) => {
    // fetch("/save-stripe-token", {
    //   method: "POST",
    //   body: JSON.stringify(token),
    // }).then((response) => {
    //   response.json().then((data) => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });

    new ApiManager().payment(token, product).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
        }
      }
      if (result.status === 200) {
        setModal(false);
        followAdd();
      } else {
        setlabelSubscription("Please check your card data and try again...");
      }
      console.log("onToken>>>", result);
    });
  };

  const ModalExample = (props) => {
    const toggle = () => setModal(!modal);
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Subscribe</ModalHeader>
          <ModalBody>
            <br />
            <h5>{labelSubscription}</h5>
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={toggle}>
              Cancel
            </Button>
            <StripeCheckout
              token={(token) => onToken(token)}
              stripeKey='pk_test_51HM7HFEUwirnzbs9oEN3dsV2le0duHYRtV7YnOOSjyx688DQcTdHLUt2z9RBluEd2oJZV4UdPadTaPhOHYSKbkYA00PoSduSGB'>
              <Button color='primary' className='btn-large blue'>
                Subscribe
              </Button>
            </StripeCheckout>
            {/* <Button
              color='primary'
              onClick={() => {
                setModal(false);
                followAdd();
              }}>
              Subscribe
            </Button>{" "} */}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  // const getChatUsers = (id) => {
  //   new ApiManager().getChatUsers(id).then((result) => {
  //     if (result.no_result) {
  //       return;
  //     }
  //     if (result.data) {
  //       if (result.data.error) {
  //         alert(result.data.error);
  //         return;
  //       }
  //       if (result.data) {
  //         setChatUsers(result.data);
  //         console.log("result getting chat  data>>>", result.data);
  //       }
  //       console.log("getting chat user>>>", result);
  //     }
  //   });
  // };

  return (
    <>
      <AddNewModal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        categories={categories}
        getUser={getUser}
      />

      {ModalExample()}
      {AlreadyfollowingModal()}
      <Row>
        <Colxx xxs='12'>
          <h1>{userData.userName}</h1>

          <div className='text-zero top-right-button-container'>
            <UncontrolledDropdown>
              {/* <Button
                outline
                color="primary"
                onClick={() => setModalOpen(!modalOpen)}
              >
                primary
              </Button> */}
            </UncontrolledDropdown>
          </div>

          <Nav tabs className='separator-tabs ml-0 mb-5'>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "details",
                  "nav-link": true,
                })}
                onClick={() => {
                  setActiveTab("details");
                }}
                location={{}}
                to='#'>
                Profile
              </NavLink>
            </NavItem>

            {userRole && userRole === "creator" ? (
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "followers",
                    "nav-link": true,
                  })}
                  onClick={() => {
                    setActiveTab("followers");
                  }}
                  location={{}}
                  to='#'>
                  Followers
                  <Badge color='outline-secondary mb-1 mr-1' pill>
                    {followersLength}
                  </Badge>
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "following",
                    "nav-link": true,
                  })}
                  onClick={() => {
                    setActiveTab("following");
                  }}
                  location={{}}
                  to='#'>
                  Following
                  <Badge color='outline-secondary mb-1 mr-1' pill>
                    {followingLength}
                  </Badge>
                </NavLink>
              </NavItem>
            )}

            {/* <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "newfollowers",
                  "nav-link": true,
                })}
                onClick={() => {
                  setActiveTab("newfollowers");
                }}
                location={{}}
                to='#'>
                New Followers
                <Badge color='outline-secondary mb-1 mr-1' pill>
                  {newFollowersLength}
                </Badge>
              </NavLink>
            </NavItem> */}
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId='details'>
              <Row>
                <Colxx xxs='12' lg='4' className='mb-4 col-left'>
                  <Card className='mb-4'>
                    <div className='position-absolute card-top-buttons'>
                      <Button
                        outline
                        color='primary'
                        className='icon-button'
                        onClick={() => setModalOpen(!modalOpen)}>
                        <i className='simple-icon-pencil' />
                      </Button>
                    </div>
                    <SingleLightbox
                      thumb={
                        userData.profileImage
                          ? userData.profileImage
                          : "/assets/img/profiles/profile.png"
                      }
                      large={
                        userData.profileImage
                          ? userData.profileImage
                          : "/assets/img/profiles/prfoile.png"
                      }
                      className='card-img-top'
                    />

                    <CardBody>
                      <p className='text-muted text-small mb-2'>About</p>
                      <p className='mb-3'>
                        {userData.aboutMe ? userData.aboutMe : undefined}{" "}
                      </p>
                      <p className='text-muted text-small mb-2'>Location</p>
                      <p className='mb-3'>
                        {userData.location ? userData.location : undefined}
                      </p>

                      <br />
                      <p className='text-muted text-small mb-2'>Credit Card</p>
                      <p className='mb-3'>
                        {userData.creditCard
                          ? "Credit Card Verified"
                          : "Credit Card not verified yet"}
                      </p>
                      <p className='text-muted text-small mb-2'>Email</p>
                      <p className='mb-3'>
                        {userData.emailVerify
                          ? "Email Verified"
                          : "Email not verified yet"}
                      </p>
                      <br />
                      <p className='text-muted text-small mb-2'>Contacts</p>
                      <div className='social-icons'>
                        <ul className='list-unstyled list-inline'>
                          <li className='list-inline-item'>
                            <NavLink
                              to={userData.facebook ? userData.facebook : "#"}
                              location={{}}>
                              <i className='simple-icon-social-facebook' />
                            </NavLink>
                          </li>
                          <li className='list-inline-item'>
                            <NavLink
                              to={userData.twitter ? userData.twitter : "#"}
                              location={{}}>
                              <i className='simple-icon-social-twitter' />
                            </NavLink>
                          </li>
                          <li className='list-inline-item'>
                            <NavLink
                              to={userData.instagram ? userData.instagram : "#"}
                              location={{}}>
                              <i className='simple-icon-social-instagram' />
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </CardBody>
                  </Card>
                </Colxx>

                <Colxx xxs='12' lg='8' className='mb-4 col-right'>
                  {userRole && userRole === "user" ? (
                    <Card
                      style={{
                        padding: "20px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}>
                      <br />

                      <h3>Who to Follow</h3>
                      <TabPane tabId='followers'>
                        {loadingUser ? (
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
                          usersData &&
                          usersData.map((itemData) => {
                            let check = false;
                            if (alreadyFollowerArr.length > 0) {
                              alreadyFollowerArr.forEach((el) => {
                                if (el === itemData._id) {
                                  return (check = true);
                                }
                              });
                            }

                            return (
                              <Card
                                style={{
                                  padding: "10px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  marginTop: "20px",
                                }}
                                className=''>
                                <Row>
                                  <Col>
                                    <ThumbnailImage
                                      rounded
                                      small
                                      src={
                                        itemData.profileImage
                                          ? itemData.profileImage
                                          : "/assets/img/profiles/profile.png"
                                      }
                                      alt='profile'
                                    />
                                  </Col>
                                  <Col style={{ paddingTop: "15px" }}>
                                    <CardSubtitle
                                      className=''
                                      style={{ marginBottom: "0px" }}>
                                      {itemData.userName}
                                    </CardSubtitle>
                                    <CardText className='text-muted text-small mb-2'>
                                      {itemData.location}
                                    </CardText>
                                  </Col>
                                  <Col>
                                    {check ? (
                                      <div>
                                        <NavLink
                                          style={{
                                            marginTop: "20px",
                                          }}
                                          className='btn btn-outline-primary btn-xs'
                                          to='#'
                                          color='primary'>
                                          <IntlMessages id='followed' />
                                        </NavLink>
                                      </div>
                                    ) : (
                                      <div>
                                        <NavLink
                                          style={{
                                            marginTop: "20px",
                                          }}
                                          className='btn btn-outline-primary btn-xs'
                                          to='#'
                                          onClick={() => {
                                            setModal(true);
                                            setFollowerId(itemData._id);
                                            setFollowerName(itemData.userName);
                                            setFollowerImage(
                                              itemData.profileImage
                                            );
                                            // after modal this will call
                                            // followAdd(
                                            //   itemData._id,
                                            //   itemData.userName,
                                            //   itemData.profileImage
                                            // );
                                          }}
                                          color='primary'
                                          location={{}}>
                                          <IntlMessages id='follow' />
                                        </NavLink>
                                      </div>
                                    )}
                                  </Col>
                                </Row>
                              </Card>
                            );
                          })
                        )}
                      </TabPane>
                    </Card>
                  ) : (
                    <Card>
                      <CardBody>
                        <BlogList userId={userId} />
                      </CardBody>
                    </Card>
                  )}
                </Colxx>
              </Row>
            </TabPane>
          </TabContent>

          {/* //// */}

          <TabContent activeTab={activeTab}>
            <TabPane tabId='followers'>
              <Card
                style={{
                  padding: "10px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}>
                <br />
                <br />
                <h3>My Followers</h3>
                <TabPane tabId='followers'>
                  {followingData.map((itemData) => {
                    return (
                      <Card
                        style={{
                          padding: "10px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          marginTop: "20px",
                        }}
                        className=''>
                        <Row>
                          <Col>
                            <ThumbnailImage
                              rounded
                              small
                              src={
                                itemData.profileImage
                                  ? itemData.profileImage
                                  : "/assets/img/profiles/profile.png"
                              }
                              alt='profile'
                            />
                          </Col>
                          <Col>
                            <CardSubtitle
                              className=''
                              style={{
                                marginBottom: "0px",
                                marginTop: "15px",
                              }}>
                              {itemData.followerName}
                            </CardSubtitle>
                            <CardText className='text-muted text-small mb-2'>
                              {itemData.location}
                            </CardText>
                          </Col>
                          <Col></Col>
                          <Col>
                            <div>
                              <Button
                                style={{
                                  marginTop: "15px",
                                }}
                                onClick={() => {
                                  // console.log("toId???", itemData.followerId);
                                  let data = {
                                    id: itemData.followerId,
                                    name: itemData.followerName,
                                    image: itemData.followerImage,
                                  };
                                  props.history.push("/profile/chat", {
                                    toObject: data,
                                  });
                                  // followAdd(itemData._id, itemData.userName);
                                  // setActiveTab("chat");
                                }}
                                color='primary'>
                                <IntlMessages id='Chat' />
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
                </TabPane>
                <br />
                <br />
              </Card>
            </TabPane>
          </TabContent>

          {/* ///// */}

          <TabContent activeTab={activeTab}>
            <TabPane tabId='following'>
              <Card
                style={{
                  padding: "10px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}>
                <br />
                <br />
                <h3>Following</h3>
                <TabPane tabId='following'>
                  {followersData.map((itemData) => {
                    return (
                      <Card
                        style={{
                          padding: "10px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          marginTop: "20px",
                        }}
                        className=''>
                        <Row>
                          <Col>
                            <ThumbnailImage
                              rounded
                              small
                              src={
                                itemData.followingImage
                                  ? itemData.followingImage
                                  : "/assets/img/profiles/profile.png"
                              }
                              alt='profile'
                            />
                          </Col>
                          <Col>
                            <CardSubtitle
                              className=''
                              style={{
                                marginTop: "15px",
                                marginBottom: "0px",
                              }}>
                              {itemData.followingName}
                            </CardSubtitle>
                            <CardText className='text-muted text-small mb-2'>
                              {itemData.location}
                            </CardText>
                          </Col>
                          <Col></Col>
                          <Col>
                            <div>
                              <Button
                                style={{
                                  marginTop: "15px",
                                }}
                                onClick={() => {
                                  // console.log("toId???", itemData.followerId);
                                  let data = {
                                    id: itemData.followingId,
                                    name: itemData.followingName,
                                    image: itemData.followingImage,
                                  };
                                  props.history.push("/profile/chat", {
                                    toObject: data,
                                  });
                                  // followAdd(itemData._id, itemData.userName);
                                  // setActiveTab("chat");
                                }}
                                color='primary'>
                                <IntlMessages id='Chat' />
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
                </TabPane>
                <br />
                <br />
              </Card>
            </TabPane>
          </TabContent>

          {/* //////// */}

          {/* <TabContent activeTab={activeTab}>
            <TabPane tabId='newfollowers'>
              <Card
                style={{
                  padding: "10px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}>
                <br />
                <br />
                <h3>New Follower</h3>
                <TabPane tabId='following'>
                  {newFollowersData.length > 0 ? (
                    newFollowersData.map((itemData) => {
                      return (
                        <Card
                          style={{
                            padding: "10px",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            marginTop: "20px",
                          }}
                          className=''>
                          <Row>
                            <Col>
                              <ThumbnailImage
                                rounded
                                small
                                src={itemData.followerImage}
                                alt='profile'
                              />
                            </Col>
                            <Col>
                              <CardSubtitle
                                className=''
                                style={{
                                  marginTop: "15px",
                                  marginBottom: "0px",
                                }}>
                                {itemData.followerName}
                              </CardSubtitle>
                              <CardText className='text-muted text-small mb-2'>
                                {itemData.location}
                              </CardText>
                            </Col>
                            <Col></Col>
                            <Col>
                              <div>
                                <Button
                                  style={{
                                    marginTop: "15px",
                                  }}
                                  onClick={() => {
                                    // setFollowerId(itemData.followerId);
                                    // setFollowerName(itemData.followerName);
                                    // setFollowerImage(itemData.followerImage);

                                    updateNewFollower(
                                      itemData._id,
                                      itemData.followerId,
                                      itemData.followerName,
                                      itemData.followerImage
                                    );
                                  }}
                                  color='primary'>
                                  <IntlMessages id='Follow Back' />
                                </Button>

                              
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      );
                    })
                  ) : (
                    <div>
                      <h4 style={{ color: "grey" }}>No New Followers</h4>
                    </div>
                  )}
                </TabPane>
                <br />
                <br />
              </Card>
            </TabPane>
          </TabContent>
        */}
        </Colxx>
      </Row>
    </>
  );
};
export default withRouter(ProfilePortfolio);
