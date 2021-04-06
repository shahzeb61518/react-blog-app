import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";
import ApiManager from "../../helpers/ApiManger";

const AddNewModal = ({ modalOpen, toggleModal, categories, getUser }) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const [userPassword, setUserPassword] = useState('')
  const [aboutMe, setAboutMe] = useState("");
  const [location, setLocation] = useState("");
  const [creditCard, setCreditCard] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    let user = await reactLocalStorage.get("user_data");
    if(user){
      user = JSON.parse(user);
      }    console.log("addnewmodel", user);
    setUserId(user.userId);
    setUserName(user.namef);
    setUserEmail(user.userEmail);
  };

  const updateUser = async () => {
    await new ApiManager()
      .updateUser(
        userId,
        image,
        userName,
        userEmail,
        aboutMe,
        location,
        creditCard,
        verifyEmail,
        facebook,
        twitter,
        instagram
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
            toggleModal();
            getUser(userId);
            console.log("result after adding>>>", result);
          }
        }
      });
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName='modal-right'
      backdrop='static'>
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id='Edit Profile' />
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label style={{ marginBottom: "0px" }} for='image'>
            Upload Profile Image
          </Label>
          <Input
            type='file'
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
        </FormGroup>

        <Label style={{ marginBottom: "0px" }}>
          <IntlMessages id='Name' />
        </Label>
        <Input
          type='text'
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Label style={{ marginBottom: "0px" }} className='mt-4'>
          <IntlMessages id='Email' />
        </Label>
        <Input
          type='text'
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />

        {/* <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={categories}
        /> */}
        <Label style={{ marginBottom: "0px" }} className='mt-4'>
          <IntlMessages id='About' />
        </Label>
        <Input
          type='textarea'
          value={aboutMe}
          onChange={(e) => {
            setAboutMe(e.target.value);
          }}
        />

        <Label style={{ marginBottom: "0px" }} className='mt-4'>
          <IntlMessages id='Location' />
        </Label>
        <Input
          type='text'
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <br />
        <Label style={{ marginBottom: "0px" }} className='mt-4'>
          <IntlMessages id='Social Links' />
        </Label>
        <Input
          type='text'
          placeholder='Facebook'
          value={facebook}
          onChange={(e) => {
            setFacebook(e.target.value);
          }}
        />
        <Input
          type='text'
          placeholder='Twitter'
          value={twitter}
          onChange={(e) => {
            setTwitter(e.target.value);
          }}
        />
        <Input
          type='text'
          placeholder='Instagram'
          value={instagram}
          onChange={(e) => {
            setInstagram(e.target.value);
          }}
        />
        {/* <CustomInput
          type="radio"
          id="exCustomRadio"
          name="customRadio"
          label="ON HOLD"
        />
        <CustomInput
          type="radio"
          id="exCustomRadio2"
          name="customRadio"
          label="PROCESSED"
        /> */}
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' outline onClick={toggleModal}>
          <IntlMessages id='Close' />
        </Button>
        <Button
          color='primary'
          onClick={() => {
            updateUser();
          }}>
          <IntlMessages id='Update' />
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
