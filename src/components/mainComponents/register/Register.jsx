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
            <label htmlFor="firstN">First Name</label>
            <FormInput
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
            <FormInput
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
            <FormInput
              placeholder="Email"
              id="email"
              type="email"
              name="email"
              value={email}
              required
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="password">Password</label>
            <FormInput
              placeholder="Password"
              id="password"
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
