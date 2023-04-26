import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import {
  EmailValidator,
  PasswordValidator,
} from "../../../utils/validation/RegexValidator";
import FormInput from "../../FormComponent/FormInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userValidate } from "./../../../services/user/user.service";
import showPwdImg from "../../../assets/icons/show-password.svg";
import hidePwdImg from "../../../assets/icons/hide-password.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!EmailValidator(email)) return setErr("Enter valid email Id");
    else if (!PasswordValidator(password))
      return setErr("Enter validated password");
    else {
      userValidate(email, password)
        .then((e) => {
          let Admin = false;
          if (e.data.length < 0) {
            console.log("invalid");
            toast(`invalid`)
          } else if (e.data[0].email === email) {
            Admin = e.data[0].type === "Admin" ? true : false;
            if (Admin === true) {
              sessionStorage.setItem("email", email);
              sessionStorage.setItem("isAdmin", true);
              sessionStorage.setItem("isUserLoggedin", true);
              navigate("/home");
              window.location.reload(true);
            } else if (!Admin) {
              sessionStorage.setItem("email", email);
              sessionStorage.setItem("isUserLoggedin", true);
              navigate("/home");
              window.location.reload(true);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          toast("invalid login");
        });
    }
  };

  return (
    <div className="Forms" id="Login">
      <div className="card">
        <h1>Login</h1>
        <Form onSubmit={handleSubmit} className="container">
          <Form.Field>
            <label htmlFor="email">Email</label>
            <FormInput
              placeholder="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Field>
          <div className="pwd-container">
            <Form.Field>
              <label htmlFor="password">
                Password
                <FormInput
                  placeholder="Password"
                  id="password"
                  type={isRevealPwd ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  message=" Enter input details"
                />
                <img
                  title={isRevealPwd ? "Hide password" : "Show password"}
                  src={isRevealPwd ? hidePwdImg : showPwdImg}
                  onClick={() => setIsRevealPwd((prevState) => !prevState)}
                />
              </label>
            </Form.Field>
          </div>
          {err.length > 0 && <p style={{ color: "red" }}>{err}</p>}
          <Button type="submit" className="blue" disabled={!email || !password}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
