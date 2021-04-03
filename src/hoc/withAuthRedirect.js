import React from "react"
import { Redirect } from "react-router-dom";


export const withAuthRedirect = (Component) => {
  
  function RedirectComponent() {
    const Auth = localStorage.getItem("isAuth")
    const isAuth = JSON.parse(Auth)

    if (isAuth === false | isAuth === null | isAuth === undefined) {
      return <Redirect to="/login" />
    } else {
      return <Component />
    }    
  }

  return RedirectComponent
};