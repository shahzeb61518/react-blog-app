import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import { adminRoot } from "../../constants/defaultValues";

import GoogleLogin from "react-google-login";
import jwtDecode from "jwt-decode";

import ApiManager from "../../helpers/ApiManger";

const Register = ({ history, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [loading1, setLoading] = useState(false);

  useEffect(() => {
    check();
  });

  const check = async () => {
    let user = await reactLocalStorage.get("user");

    if (user === "true") {
      console.log("uusserr :: ", user);
      return history.push("/profile");
    }
  };

  const onUserRegister = async () => {
    console.log("data :: ", password);
    setLoading(true);

    await new ApiManager()
      .singUp(name, email, password, role)
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
            history.push("/user/login");
          }

          console.log("result after adding>>>", result);
        }
      });
    // await axios
    //   .post('https://marrage-backend.herokuapp.com/api/v1/auth/register', {
    //     name: name,
    //     email: email,
    //     password: password,
    //   })
    //   .then(async (res) => {
    //     history.push('/user/verify');
    //   })
    //   .catch((e) => {
    //     setLoading(false);
    //     NotificationManager.warning(
    //       null,
    //       'Email already exist',
    //       3000,
    //       null,
    //       null,
    //       ''
    //     );
    //   });
  };

  const responseGoogle = async (response) => {
    if (response) {
      await new ApiManager()
        .loginWithGoogle(
          response.profileObj.name,
          response.profileObj.email,
          response.accessToken
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
              const { token } = result.data;
              var decoded = jwtDecode(token);
              let user_data = JSON.stringify(decoded);
              reactLocalStorage.set("user", true);
              reactLocalStorage.set("user_data", user_data);
              reactLocalStorage.set("token", token);

              history.push("/profile");
            }
            console.log("google api response>>>", result);
          }
        });
    }
    console.log("google response>>>", response);
  };

  const responseGoogleError = async (response) => {
    console.log("Error response", response);
  };

  return (
    <Row className='h-100'>
      <Colxx xxs='12' md='10' className='mx-auto my-auto'>
        <Card className='auth-card'>
          <div className='position-relative image-side '>
            <p className='text-white h2'>Application Name</p>
            <p className='white mb-0'>
              Please use this form to register. <br />
              If you are a member, please{" "}
              <NavLink to='/user/login' className='white'>
                login
              </NavLink>
            </p>
          </div>

          <div className='form-side'>
            <CardTitle className='mb-4'>Register</CardTitle>
            <div style={{ width: "100%", textAlign: "center" }}>
              <GoogleLogin
                clientId='989350622141-263iao24sq0qcppvstssnvp2j2qp3cb5.apps.googleusercontent.com'
                buttonText='Login with Google'
                onSuccess={responseGoogle}
                onFailure={responseGoogleError}
                cookiePolicy={"single_host_origin"}
              />
              {/* <GoogleLogout
                clientId='989350622141-263iao24sq0qcppvstssnvp2j2qp3cb5.apps.googleusercontent.com'
                buttonText='Logout'
                onLogoutSuccess={responseGoogleError}></GoogleLogout> */}
            </div>
            <br />
            <br />
            <Form>
              <FormGroup className='form-group has-float-label  mb-4'>
                <Label>
                  <IntlMessages id='user.fullname' />
                </Label>
                <Input
                  type='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for='roleselect'>Role</Label>
                <Input
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  type='select'
                  name='select'
                  id='roleselect'>
                  <option selected value='user'>
                    User
                  </option>
                  <option value='creator'>Creator</option>
                </Input>
              </FormGroup>

              <FormGroup
                style={{ marginTop: "30px" }}
                className='form-group has-float-label  mb-4'>
                <Label>
                  <IntlMessages id='user.email' />
                </Label>
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup className='form-group has-float-label  mb-4'>
                <Label>
                  <IntlMessages id='user.password' />
                </Label>
                <Input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <div className='d-flex justify-content-between align-items-center'>
                <NavLink to='/user/login'>
                  <IntlMessages id='Login' />
                </NavLink>
                <Button
                  color='primary'
                  disabled={loading1}
                  className={"btn-shadow btn-multiple-state"}
                  size='lg'
                  onClick={() => onUserRegister()}>
                  <IntlMessages id='user.register-button' />
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Register;
