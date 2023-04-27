import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../FormComponent/FormInput";
import {
  EmailValidator,
  PasswordValidator,
} from "../../../utils/validation/RegexValidator";
import "../../../assets/styles/Home.css";
import { useDispatch } from "react-redux";
import { adduser } from "../../../redux/Action/Action";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const { firstName, lastName, email, password } = data;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EmailValidator(email)) {
      setErr("Enter valid email Id");
    } else if (!PasswordValidator(password)) {
      setErr("Enter validated password");
    } else {
      dispatch(adduser(data));
      setData({
        firstName: "",
        lastName: "",
        email: "",
        img: "",
        password: "",
      });
      navigate("/login");
    }
  };

  return (
    <div className="Forms" id="Register">
      <div className="card">
        <h1>Register</h1>
        <Form onSubmit={handleSubmit} className="container">
          <Form.Field>
            <FormInput
              placeholder="First Name"
              label="First Name"
              type="text"
              name="firstName"
              value={firstName}
              required
              maxLength="10"
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <FormInput
              placeholder="Last Name"
              label="Last Name"
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
            <FormInput
              placeholder="Email"
              label="Email"
              type="email"
              name="email"
              value={email}
              required
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <FormInput
              placeholder="Password"
              label="Password"
              type="password"
              name="password"
              value={password}
              required
              onChange={handleChange}
            />
          </Form.Field>
          {err.length > 0 && <p style={{ color: "red" }}>{err}</p>}

          <Button
            className="blue"
            type="submit"
            disabled={!firstName || !lastName || !email || !password}
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}
