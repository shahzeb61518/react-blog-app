import React, { useState, useEffect } from "react";
import AppLayout from "../../../../layout/AppLayout";
import { reactLocalStorage } from "reactjs-localstorage";
import ApiManager from "../../../../helpers/ApiManger";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import StripeCheckout from "react-stripe-checkout";

import axios from "axios";
import { NavLink } from "react-router-dom";
import { ContextMenuTrigger } from "react-contextmenu";
import classnames from "classnames";

import { servicePath } from "../../../../constants/defaultValues";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import {
  Colxx,
  Separator,
} from "../../../../components/common/CustomBootstrap";
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Card,
  Collapse,
} from "reactstrap";
import { injectIntl } from "react-intl";

import ListPageHeading from "../../../../containers/pages/ListPageHeading";
import AddNewModal from "../../../../containers/pages/AddNewModal";
import ListPageListing from "../../../../containers/pages/ListPageListing";
import useMousetrap from "../../../../hooks/use-mousetrap";
import { check } from "prettier";

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const apiUrl = `${servicePath}/cakes/paging`;

const orderOptions = [
  { column: "title", label: "Product Name" },
  { column: "category", label: "Category" },
  { column: "status", label: "Status" },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: "Cakes", value: "Cakes", key: 0 },
  { label: "Cupcakes", value: "Cupcakes", key: 1 },
  { label: "Desserts", value: "Desserts", key: 2 },
];

const ThumbListPages = ({ match }) => {
  const [userData, setUserData] = useState({});
  const [userData2, setUserData2] = useState({});
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [followersData, setFollowersData] = useState("");

  const [followerId, setFollowerId] = useState("");
  const [followerName, setFollowerName] = useState("");
  const [followerImage, setFollowerImage] = useState("");
  const [followModal, setFollowModal] = useState(false);

  const [modal, setModal] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState("thumblist");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: "title",
    label: "Product Name",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  const [product, setProduct] = useState({
    name: "Purchase Subscription",
    price: 10,
    productBy: "Blog",
  });

  const [labelSubscription, setlabelSubscription] = useState(
    "If you want to follow this person please subscribe..."
  );

  useEffect(() => {
    let user = reactLocalStorage.get("user_data");
    if(user){
      user = JSON.parse(user);
      }    console.log("user>>>>", user);
    setUserRole(user.role);

    setUserId(user.userId);
    setUserName(user.namef);
    setUserImage(user.profileImage);

    getAllUsers(user.userId);
    getFollowers(user.userId);

    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  const handleSearch = (e) => {
    let search = e.target.value.toLowerCase();
    setSearch(search);
    let arr = userData2.filter(
      (el) =>
        el.userName &&
        el.userName.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    setUserData(arr);
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

          setUserData(arr);
          setUserData2(arr);
          // setloadingUser(false);
          setIsLoaded(true);
        }
        console.log("result user data>>>", result);
      }
    });
  };

  const getFollowers = (id, arr2) => {
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

          // setFollowersData(result.data);
          setFollowersData(arr);
          // setFollowingLength(result.data.length);
          // console.log("result followers data>>>", result.data);
        }
        console.log("followersresult>>>", result);
      }
    });
  };

  const followAdd = (id, name, img) => {
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
            // getFollowing(userId);
          }
          console.log("result>>>", result);
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

  // useEffect(() => {
  //   async function fetchData() {
  //     axios
  //       .get(
  //         `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`
  //       )
  //       .then((res) => {
  //         return res.data;
  //       })
  //       .then((data) => {
  //         setTotalPage(data.totalPage);
  //         setItems(
  //           data.data.map((x) => {
  //             return { ...x, img: x.img.replace("img/", "img/products/") };
  //           })
  //         );
  //         setSelectedItems([]);
  //         setTotalItemCount(data.totalItem);
  //         setIsLoaded(true);
  //       });
  //   }
  //   fetchData();
  // }, [selectedPageSize, currentPage, selectedOrderOption, search]);

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...items];
      const start = getIndex(id, newItems, "id");
      const end = getIndex(lastChecked, newItems, "id");
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log("onContextMenuClick - selected items", selectedItems);
    console.log("onContextMenuClick - action : ", data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  useMousetrap(["ctrl+a", "command+a"], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(["ctrl+d", "command+d"], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className='loading' />
  ) : (
    <>
      <AppLayout>
        <div className='disable-text-selection'>
          {ModalExample()}
          <Colxx xxs='12'>
            <div className='mb-2'>
              <h1>Creators</h1>

              <div className='text-zero top-right-button-container'></div>
              <Breadcrumb match={match} />
            </div>

            <div className='mb-2'>
              {/* <Button
                color='empty'
                className='pt-0 pl-0 d-inline-block d-md-none'
                onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}>
                <i className='simple-icon-arrow-down align-middle' />
              </Button> */}
              <Collapse
                isOpen={displayOptionsIsOpen}
                className='d-md-block'
                id='displayOptions'>
                <div className='d-block d-md-inline-block pt-1'>
                  <div className='search-sm d-inline-block float-md-left mr-1 mb-1 align-top'>
                    <input
                      style={{ width: "300px" }}
                      type='text'
                      name='keyword'
                      id='search'
                      placeholder='search...'
                      value={search}
                      onChange={(e) => {
                        handleSearch(e);
                      }}
                      // onKeyPress={(e) => {
                      //   // onSearchKey(e)
                      //   if (e.key === "Enter") {
                      //     setSearch(e.target.value.toLowerCase());
                      //   }
                      // }}
                    />
                  </div>
                </div>
              </Collapse>
            </div>
            <Separator className='mb-5' />
          </Colxx>

          {/* <ListPageListing
            items={userData}
            displayMode={displayMode}
            selectedItems={selectedItems}
            onCheckItem={onCheckItem}
            currentPage={currentPage}
            totalPage={totalPage}
            onContextMenuClick={onContextMenuClick}
            onContextMenu={onContextMenu}
            onChangePage={setCurrentPage}
          /> */}

          {userData.length > 0
            ? userData.map((product) => {
                let check = false;
                if (followersData.length > 0) {
                  followersData.forEach((el) => {
                    if (el === product._id) {
                      return (check = true);
                    }
                  });
                }

                return (
                  <Colxx xxs='12' className='mb-3'>
                    <ContextMenuTrigger id='menu_id' data={product.id}>
                      <Card
                        onClick={(event) => onCheckItem(event, product.id)}
                        className={classnames("d-flex flex-row")}>
                        <img
                          style={{ height: "95px" }}
                          alt={product.userName}
                          src={product.profileImage}
                          className='list-thumbnail responsive border-0 card-img-left'
                        />
                        <div className='pl-2 d-flex flex-grow-1 min-width-zero'>
                          <div className='card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center'>
                            <p className='list-item-heading mb-1 truncate'>
                              {product.userName}
                            </p>
                            <p className='mb-1 text-muted text-small w-15 w-sm-100'>
                              {product.aboutMe}
                            </p>
                            <p className='mb-1 text-muted text-small w-15 w-sm-100'>
                              {product.location}
                            </p>

                            {check ? (
                              <div className='w-15 w-sm-100'>
                                <Button disabled={true} color='primary' pill>
                                  Subscribed
                                </Button>
                              </div>
                            ) : (
                              <div className='w-15 w-sm-100'>
                                <Button
                                  onClick={() => {
                                    setModal(true);
                                    setFollowerId(product._id);
                                    setFollowerName(product.userName);
                                    setFollowerImage(product.profileImage);
                                  }}
                                  color='primary'
                                  pill>
                                  Subscribe
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </ContextMenuTrigger>
                  </Colxx>
                );
              })
            : "No Creator availabale"}
        </div>
      </AppLayout>
    </>
  );
};

export default ThumbListPages;
