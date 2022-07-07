import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

/**This reducerfunction for the first argument of useReducer is created
 * outside the component function.
 * This is done because inside of this below function we don't need any data that is
 * generated inside of the component function.
 * So this reducer function can be created outside the scope of this component
 * function.
 *
 * all the things required by this function will be passed as parameters by
 * react automatically when this function is called.
 *  */
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwdReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.val, isValid: state.value.trim().length > 6 };
  }
  return {
    value: "",
    isValid: false,
  };
};

const Login = (props) => {
  /**All the states below can be thought of as a single form validation state
   * which includes user inputs and their validity.
   * We can use reducers to keep track of such
   */
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwdReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  /**Commenting useEffect code to understand useReducer */
  // useEffect(() => {
  //   console.log("Type 1");
  // }, [enteredEmail]);

  /**The setFormIsValid function will run every 500 ms.
   * Here we have clean function which clear the timeout.
   * Cleanup function runs before every execution of the useEffect,
   * except the first execution.
   */
  useEffect(() => {
    const identifier = setTimeout(() => {
      // console.log("checking form validity");
      setFormIsValid(
        //enteredEmail.includes("@") && enteredPassword.trim().length > 6
        //emailState.isValid && passwordState.isValid
        emailIsValid && passwordIsValid
      );
    }, 500);
    return () => {
      // console.log("Cleanup");
      clearTimeout(identifier);
    };
    /**Below lines are executed on every keystroke.
     * We want to make sure that these are executed on every 500 ms.
     * For that we have used them inside a timer.
     */
    // console.log("checking form validity");
    // setFormIsValid(
    //   enteredEmail.includes("@") && enteredPassword.trim().length > 6
    // );
    //}, [enteredEmail, enteredPassword]);
    // }, [emailState, passwordState]);
  }, [emailIsValid, passwordIsValid]);
  /**Here email change handler will check on the every keystroke if the form is valid.
   * Therefor, setForIsValid is a side effect of the email value change in the input field.
   * We remove it from below and add as a side effect with dependency on enteredEmail and password.
   */
  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    /**Comment below when using useEffect. As the same was reused at multiple place
     * it was commented for the use of useEffect.
     * uncommented back for the useReducer */
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );

    // setFormIsValid(
    //   emailState.value.includes("@") && event.target.value.trim().length > 6)
    // );

    setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    /**Comment below when using useEffect. As the same was reused at multiple place
     * it was commented for the use of useEffect.
     * uncommented back for the useReducer */
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes("@")
    // );

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.includes("@"));
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //props.onLogin(enteredEmail, enteredPassword);
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        > */}

        {/* The whole div with label and input inside it, replaced by Input component which is generic. 
        Same for email and password both.  */}
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          {/* <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          /> */}
        {/* <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          /> 
        //</div> */}
        {/* <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        > */}
        {/* <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          {/* <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          /> }
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}

        {/* Below we have used custom Input component which is generic, replaced in place of above code 
      with  div and label, input inside that div */}
        <Input
          id="email"
          label="E-Mail"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
