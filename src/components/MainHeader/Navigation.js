import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
  //Method 2: Using React useContext hook
  const ctx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );

  //Method 1 :  to listen/access the value of the context, Using AuthContext.Consumer
  // return (
  //   <AuthContext.Consumer>
  //     {(ctx) => {
  // return (
  //   <nav className={classes.nav}>
  //     <ul>
  //       {ctx.isLoggedIn && (
  //         <li>
  //           <a href="/">Users</a>
  //         </li>
  //       )}
  //       {ctx.isLoggedIn && (
  //         <li>
  //           <a href="/">Admin</a>
  //         </li>
  //       )}
  //       {ctx.isLoggedIn && (
  //         <li>
  //           <button onClick={props.onLogout}>Logout</button>
  //         </li>
  //       )}
  //     </ul>
  //   </nav>
  // );
  //     }}
  //   </AuthContext.Consumer>
  // );
  //Original Code
  // return (
  // <nav className={classes.nav}>
  //   <ul>
  //     {props.isLoggedIn && (
  //       <li>
  //         <a href="/">Users</a>
  //       </li>
  //     )}
  //     {props.isLoggedIn && (
  //       <li>
  //         <a href="/">Admin</a>
  //       </li>
  //     )}
  //     {props.isLoggedIn && (
  //       <li>
  //         <button onClick={props.onLogout}>Logout</button>
  //       </li>
  //     )}
  //   </ul>
  // </nav>
  //);
};

export default Navigation;
