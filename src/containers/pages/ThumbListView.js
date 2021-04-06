import React, { useState, useEffect } from "react";
import { Card, CustomInput, Badge, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import { reactLocalStorage } from "reactjs-localstorage";
import ApiManager from "../../helpers/ApiManger";

const ThumbListView = ({ product, isSelect, collect, onCheckItem }) => {
  const [folowersLength, setFollowersLength] = useState(Number);

  useEffect(() => {
    let user = reactLocalStorage.get("user_data");
    if(user){
      user = JSON.parse(user);
      }    console.log("user>>>>", user);
    getFollowing(user.userId);
  }, []);

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
          setFollowersLength(result.data.length);
        }
        console.log("followingresult>>>", result);
      }
    });
  };

  return (
    <Colxx xxs='12' key={product.id} className='mb-3'>
      <ContextMenuTrigger id='menu_id' data={product.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          className={classnames("d-flex flex-row", {
            active: isSelect,
          })}>
          <NavLink to={`?p=${product.id}`} className='d-flex'>
            <img
              alt={product.userName}
              src={product.profileImage}
              className='list-thumbnail responsive border-0 card-img-left'
            />
          </NavLink>
          <div className='pl-2 d-flex flex-grow-1 min-width-zero'>
            <div className='card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center'>
              <NavLink to={`?p=${product.id}`} className='w-40 w-sm-100'>
                <p className='list-item-heading mb-1 truncate'>
                  {product.userName}
                </p>
              </NavLink>
              <p className='mb-1 text-muted text-small w-15 w-sm-100'>
                {product.aboutMe}
              </p>
              <p className='mb-1 text-muted text-small w-15 w-sm-100'>
                {product.location}
              </p>
              {/* <div className='w-15 w-sm-100'>
                <Badge color={product.statusColor} pill>
                  {folowersLength}
                </Badge>
              </div> */}
              <div className='w-15 w-sm-100'>
                <Button color='primary' pill>
                  Subscribe
                </Button>
              </div>
            </div>
            {/* <div className='custom-control custom-checkbox pl-1 align-self-center pr-4'>
              <CustomInput
                className='item-check mb-0'
                type='checkbox'
                id={`check_${product.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=''
              />
            </div> */}
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
