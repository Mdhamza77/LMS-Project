import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadUsers } from "../../../../redux/Action/Action";
const Myprofile = () => {
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const isUserLoggedin = sessionStorage.getItem("isUserLoggedin")
    ? sessionStorage.getItem("isUserLoggedin")
    : false;
  const isAdmin = sessionStorage.getItem("isAdmin")
    ? sessionStorage.getItem("isAdmin")
    : false;

  const Update = (id) => {
    navigate("/EditUser/" + id);
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="ui">
          <div className="ui link cards">
            {
              //eslint-disable-next-line
              users
                .filter((item) => {
                  if (item.email === email) {
                    return email;
                  }
                })
                .map((mail) => (
                  <div className="card" key={mail.id}>
                    <div className="image">
                      <img src={mail.img} alt="profile-img" />
                    </div>
                    <div className="content">
                      <div className="header">
                        {mail.firstName + " " + mail.lastName}
                      </div>
                      <div className="meta">
                        <p>"{mail.email}"</p>
                      </div>
                      <div className="description">
                        <b>Description</b>: {mail.content}
                      </div>
                    </div>
                    <div className="extra content">
                      <span className="floated">
                        <b>User ID : {mail.id}</b>
                      </span>

                      {isUserLoggedin && !isAdmin && (
                        <Button
                          className="blue"
                          onClick={() => Update(mail.id)}
                        >
                          Update
                        </Button>
                      )}
                      {isUserLoggedin && (
                        <Button className="red" onClick={() => navigate("/")}>
                          Go Back
                        </Button>
                      )}
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
