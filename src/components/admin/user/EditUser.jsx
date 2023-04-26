import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import showPwdImg from "../../../assets/icons/show-password.svg";
import hidePwdImg from "../../../assets/icons/hide-password.svg";
import { Form, Button, TextArea } from "semantic-ui-react";

import { edituser, singleuser } from "../../../redux/Action/Action";

import {
PasswordValidator,
  EmailValidator,
} from "../../../utils/validation/RegexValidator";

const EditUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    content: "",
    email: "",
    img: "",
    password: "",
  });
  const { firstName, lastName, email, img, password, content } = data;
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [err, setErr] = useState("");
  const { user } = useSelector((state) => state.data);

  const dispatch = useDispatch();
  const { id } = useParams();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  useEffect(() => {
    dispatch(singleuser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setData({ ...user });
    }
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!EmailValidator(email)) {
      return setErr("not validated");
    } else if (!PasswordValidator(password)) {
      return setErr("not validated");
    } else {
      dispatch(edituser(id ,data));
      navigate("/");
    }
  };

  return (
    <div className="Forms">
      <div className="card">
        <h1 className="">Edit User</h1>
        <Form className="container">
          <Form.Field>
            <label htmlFor="firstN">First Name</label>
            <input
              placeholder="First Name"
              id="firstN"
              type="text"
              name="firstName"
              value={firstName}
              required
              maxLength="10"
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="lastN">Last Name</label>
            <input
              placeholder="Last Name"
              id="lastN"
              type="text"
              name="lastName"
              value={lastName}
              required
              minLength="2"
              maxLength="10"
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email"
              id="email"
              type="email"
              name = "email"
              value={email}
              required
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field className="pwd-container">
            <label htmlFor="password">
              Password
              <input
                placeholder="Password"
                id="password"
                type={isRevealPwd ? "text" : "password"}
                value={password}
                required
                onChange={handleChange}
              />
              <img
                title={isRevealPwd ? "Hide password" : "Show password"}
                src={isRevealPwd ? hidePwdImg : showPwdImg}
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label>Profile Image</label>
            <input
              type="text"
              value={img}
              name="img"
              placeholder="profile image"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>About you</label>
            <TextArea
              type="text"
              value={content}
              name = "content"
              placeholder="Tell us About you"
              min="20"
              max="150"
              onChange={handleChange}
            />
          </Form.Field>

          <Button className="blue" onClick={handleSubmit}>
            Save
          </Button>
          <Button className="red" onClick={() => navigate("/home")}>
            Go Back
          </Button>
          {err.length > 0 && <p>{err}</p>}
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
