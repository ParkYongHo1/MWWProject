import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "../Main/css/Alert";
import Screen from "../Main/components/Screen";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Test from "./Test";
function Main(props) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const click = async () => {
    try {
      axios.get("http://localhost:8080/api/user").then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <Alert>로그인후 확인가능합니다.</Alert>
          <>
            <Test isLoggedIn={isLoggedIn}></Test>
          </>
        </>
      ) : (
        <>
          <Test isLoggedIn={isLoggedIn}></Test>
        </>
      )}
    </div>
  );
}
export default Main;
