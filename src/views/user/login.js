import React, { useState, useEffect } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

import { Formik, Form, Field } from "formik";
import { NotificationManager } from "../../components/common/react-notifications";

import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import ApiManager from "../../helpers/ApiManger";
import jwtDecode from "jwt-decode";
import GoogleLogin from "react-google-login";

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please enter your password";
  } else if (value.length < 4) {
    error = "Value must be longer than 3 characters";
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const onUserLogin = async () => {
    setLoading(true);

    await new ApiManager().signIn(email, password).then((result) => {
      if (result.no_result) {
        setLoading(false);
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          setLoading(false);
          return;
        }

        if (result.data) {
          if (result.data.message) {
            setLoading(false);
            return alert("Please check your email and password!");
          }
          const { token } = result.data;
          var decoded = jwtDecode(token);
          let user_data = JSON.stringify(decoded);
          reactLocalStorage.set("user", true);
          reactLocalStorage.set("user_data", user_data);
          reactLocalStorage.set("token", token);

          history.push("/profile");
        }

        console.log("result after adding>>>", result);
      }
    });
    // await axios
    //   .post('https://marrage-backend.herokuapp.com/api/v1/auth/login', {
    //     email: email,
    //     password: password,
    //   })
    //   .then(async (res) => {
    //     await reactLocalStorage.set('user', true);
    //     history.push('/');
    //   })
    //   .catch((e) => {
    //     setLoading(false);
    //     NotificationManager.warning(
    //       error,
    //       'Email/Password incorrect',
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

  const initialValues = { email, password };

  return (
    <Row className='h-100'>
      <Colxx xxs='12' md='10' className='mx-auto my-auto'>
        <Card className='auth-card'>
          <div className='position-relative image-side '>
            <p className='text-white h2'>Application Name</p>
            <p className='white mb-0'>
              Please use your credentials to login.
              <br />
              If you are not a member, please{" "}
              <NavLink to='/user/register' className='white'>
                register
              </NavLink>
              .
            </p>
          </div>
          <div className='form-side'>
            <CardTitle className='mb-4'>Login</CardTitle>

            <div style={{ width: "100%", textAlign: "center" }}>
              <GoogleLogin
                clientId='989350622141-263iao24sq0qcppvstssnvp2j2qp3cb5.apps.googleusercontent.com'
                buttonText='Login with Google'
                onSuccess={responseGoogle}
                onFailure={responseGoogleError}
                cookiePolicy={"single_host_origin"}
              />
            </div>

            <br />
            <br />
            {/* <CardTitle className="mb-4">
              <IntlMessages id="user.appname" />
            </CardTitle> */}

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className='av-tooltip tooltip-label-bottom'>
                  <FormGroup className='form-group has-float-label'>
                    <Label>
                      <IntlMessages id='user.email' />
                    </Label>
                    <Field
                      className='form-control'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )} */}
                  </FormGroup>
                  <FormGroup className='form-group has-float-label'>
                    <Label>
                      <IntlMessages id='user.password' />
                    </Label>
                    <Field
                      className='form-control'
                      type='password'
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )} */}
                  </FormGroup>
                  <div className='d-flex justify-content-between align-items-center'>
                    <NavLink to='/user/register'>
                      <IntlMessages id='user.register' />
                    </NavLink>
                    <Button
                      disabled={loading1}
                      color='primary'
                      className={`btn-shadow btn-multiple-state ${
                        loading1 ? "show-spinner" : ""
                      }`}
                      size='lg'>
                      <span className='spinner d-inline-block'>
                        <span className='bounce1' />
                        <span className='bounce2' />
                        <span className='bounce3' />
                      </span>
                      <span className='label'>
                        <IntlMessages id='user.login-button' />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Login;
