import React from "react";
import { Route, Routes } from "react-router-dom";
import AddBooks from "../components/admin/books/AddBooks";
import Login from "../components/mainComponents/login/Login";
import Register from "../components/mainComponents/register/Register";
import Home from "../components/homePage/home";
import EditBooks from "../components/admin/books/EditBooks";
import Rent from "../components/user/pages/rentList/Rent";
import RentList from "../components/user/pages/rentList/RentList";
import NoMatch from "../components/mainComponents/NoMatch";
import Homepage from "../components/layouts/footer/Homepage";
import User from "../components/admin/user/User";
import Feedback from "../components/user/pages/feedBack/Feedback";
import EditUser from "../components/admin/user/EditUser";
import Myprofile from "../components/user/pages/myProfile/Myprofile";
import UBook from "../components/bookList/UBook";
import Books from "../components/category/Books";
import AddCategory from "../components/admin/category/AddCategory";
import Search from "../components/bookList/Search";
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

        {isUserLoggedin && isAdmin && (
          <Route path="/editBooks" element={<EditBooks />}></Route>
        )}
        {isUserLoggedin && isAdmin && (
          <Route path="/EditBooks/:id" element={<EditBooks />}></Route>
        )}
        {isUserLoggedin && !isAdmin && (
          <Route path="/Rent/:id/" element={<Rent />}></Route>
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
        {isUserLoggedin && (
          <Route path="/EditUser/:id" element={<EditUser />}></Route>
        )}

        {isUserLoggedin && (
          <Route path="/booklist/:id" element={<UBook />}></Route>
        )}
        {isUserLoggedin && isAdmin && (
          <Route path="/add-category" element={<AddCategory />}></Route>
        )}
        {isUserLoggedin && (
          <Route
            path="/category/books/:category/:id"
            element={<UBook />}
          ></Route>
        )}
        {isUserLoggedin && (
          <Route path="/category/books/:category" element={<Books />}></Route>
        )}
        {isUserLoggedin && (
          <Route path="/search/:sr" element={<Search />}></Route>
        )}
        {isUserLoggedin && isAdmin && (
          <Route path="/rentlist/:email" element={<RentList />}></Route>
        )}
        {isUserLoggedin && (
          <Route path="/search/:sr/:id" element={<UBook />}></Route>
        )}
      </Routes>
    </div>
  );
};

export default Routing;
