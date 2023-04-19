import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteuser, loadUsers } from "../../../redux/Action/Action";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const User = () => {
  let dispatch = useDispatch();

  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  const Edit = (id) => {
    navigate("/EditUser/" + id);
  };

  const MyBook = (email) => {
    navigate("/rentlist/" + email);
  };

  const Delete = (id) => {
    if (window.confirm("are you sure ")) dispatch(deleteuser(id));
  };

  return (
    <div>
      <div>
        <h1>User Dashboard Details</h1>
        {
          // eslint-disable-next-line
          users
            .filter((e) => {
              if (e.email !== email) return e;
            })
            .map((users) => (
              <div key={users.id}>
                <div className="card">
                  <Form>
                    <div className="container black">
                      <p>
                        <img
                          className="user-Img"
                          src={users.img}
                          alt="user-Image"
                        />
                        <h3>First name : {users.firstName}</h3>
                        <h3>Last name : {users.lastName}</h3>
                        <h3>Email id : {users.email}</h3>
                        <h3>user Id : {users.id}</h3>

                        <Button
                          className="blue"
                          onClick={() => MyBook(users.email)}
                        >
                          MyBook
                        </Button>
                        <Button className="blue" onClick={() => Edit(users.id)}>
                          Edit
                        </Button>
                        <Button
                          className="red"
                          onClick={() => Delete(users.id)}
                        >
                          Delete
                        </Button>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            ))
        }

        <br />
        <div className="uis">
          <Button className="red" onClick={() => navigate("/home")}>
            Go Back
          </Button>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
};

export default User;
