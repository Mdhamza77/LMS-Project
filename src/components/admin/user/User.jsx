import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAll, deleteUser } from "../../../services/user/user.service";
const User = () => {
  const [user, getUser] = useState([]);
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();
  const getData = async () => {
    return await getAll()
      .then((res) => {
        getUser(res.data);
      })
      .catch((err) => console.log(err.data));
  };

  const Edit = (id) => {
    navigate("/EditUser/" + id);
  };

  const MyBook = (email) => {
    navigate("/rentlist/" + email);
  };

  const Delete = (id) => {
    deleteUser(id)
      .then(() => {
        toast("Deleted User Successfully");
        getData();
      })
      .catch((err) => console.log(err.data));
  };

  useEffect(() => {
    getData();
    Delete();
  }, []);

  return (
    <div>
      <div>
        <h1>User Dashboard Details</h1>
        {
          // eslint-disable-next-line
          user
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
