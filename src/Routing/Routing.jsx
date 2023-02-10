import React from "react";
import { Route, Routes } from "react-router-dom";
import AddBooks from "../Components/Admin/Pages/AddBooks";
import Login from "../Components/MainComponents/Login";
import Register from "../Components/MainComponents/Register";
import Home from "../Components/User/home";
import EditBooks from "../Components/Admin/Pages/EditBooks";
import Admin from "../Components/Admin/Admin";
import Rent from "../Components/User/Pages/Rent";
import RentList from "../Components/User/Pages/RentList";
import NoMatch from "../Components/MainComponents/NoMatch";
import Homepage from "../Components/Layouts/Footer/Homepage";
import User from "../Components/Admin/Pages/User";
import Feedback from "../Components/User/Pages/Feedback";
import EditUser from "../Components/Admin/Pages/EditUser";
import EditMyProfile from '../Components/User/Pages/EditMyProfile'
import Myprofile from "../Components/User/Pages/Myprofile";
const Routing = () => {
  const isUserLoggedin = sessionStorage.getItem("isUserLoggedin")
    ? sessionStorage.getItem("isUserLoggedin")
    : false;
  const isAdmin = sessionStorage.getItem("isAdmin")
    ? sessionStorage.getItem("isAdmin")
    : false;

  return (
    <div>
      <Routes>
        {isUserLoggedin && isAdmin && (
          <Route path="/addBooks" element={<AddBooks />}></Route>
        )}
        {!isUserLoggedin && <Route path="/login" element={<Login />}></Route>}
        {!isUserLoggedin && (
          <Route path="/register" element={<Register />}></Route>
        )}
        {isUserLoggedin && (
          <Route path="/profile" element={<Myprofile />}></Route>
        )}
        <Route path="/home" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        {isUserLoggedin && isAdmin && (
          <Route path="/editBooks" element={<EditBooks />}></Route>
        )}
        {isUserLoggedin && isAdmin && (
          <Route path="/EditBooks/:id" element={<EditBooks />}></Route>
        )}
        {isUserLoggedin && !isAdmin && (
          <Route path="/Rent/:id" element={<Rent />}></Route>
        )}
        <Route path="*" element={<NoMatch />}></Route>
        {isUserLoggedin && !isAdmin && (
          <Route path="/RentList" element={<RentList />}></Route>
        )}
        {<Route path="" element={<Homepage />}></Route>}
        {isUserLoggedin && isAdmin && (
          <Route path="/user" element={<User />}></Route>
        )}
        {isUserLoggedin && !isAdmin && (
          <Route path="feedback" element={<Feedback />}></Route>
        )}
        {isUserLoggedin && isAdmin && (
          <Route path="/EditUser/:id" element={<EditUser />}></Route>
        )}
          {isUserLoggedin && !isAdmin && (
          <Route path="/EditMyProfile/:id" element={<EditMyProfile/>}></Route>
        )}     
      </Routes>
    </div>
  );
};

export default Routing;
