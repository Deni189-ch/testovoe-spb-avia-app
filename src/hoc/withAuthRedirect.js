import React from "react"
import { Redirect } from "react-router-dom";


export const withAuthRedirect = (Component) => {
  
  function RedirectComponent() {
    const isAuth = JSON.parse(localStorage.getItem("isAuth"))

    if (Boolean(isAuth))  return <Component />

    return <Redirect to="/login" />
  }

  return RedirectComponent
};