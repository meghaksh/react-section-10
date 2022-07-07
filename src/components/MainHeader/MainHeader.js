import React from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    //below lines of code is used when using Consumer for authcontext.
    //we removed the isLoggedIn prop passed in Navigation component.
    // we stop forwarding it because we have used contenx in the provider
    //instead of a prop chain.
    // also we removed onLoutout
    <header className={classes["main-header"]}>
      <h1>A Typical Page</h1>
      <Navigation />
    </header>

    // <header className={classes["main-header"]}>
    //   <h1>A Typical Page</h1>
    //   <Navigation
    //     isLoggedIn={props.isAuthenticated}
    //     onLogout={props.onLogout}
    //   />
    // </header>
  );
};

export default MainHeader;
