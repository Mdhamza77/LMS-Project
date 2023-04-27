import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";
import { Provider } from "react-redux";
import RootReducer from "../../../redux/root-reducer/RootReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: RootReducer,
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("register user component", () => {
  it("registeration", () => {
    render(
      <Provider store={store}>
        {" "}
        <Register />{" "}
      </Provider>
    );

    const fName = screen.getByLabelText("First Name");
    const lName = screen.getByLabelText("Last Name");
    const eMail = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByRole("button");

    expect(fName).toBeInTheDocument();
    expect(lName).toBeInTheDocument();
    expect(eMail).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeDisabled();

    fireEvent.change(fName, { target: { value: "Muhammed" } });
    fireEvent.change(lName, { target: { value: "Hamza N" } });
    fireEvent.change(eMail, { target: { value: "tester123@gmail.com" } });
    fireEvent.change(password, { target: { value: "Tester@123" } });
    expect(button).toBeEnabled();
  });

  it("submit form disabled", () => {
    const onSubmit = jest.fn();
    render(
      <Provider store={store}>
        {" "}
        <Register onSubmit={onSubmit} />{" "}
      </Provider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("submit form is Enabled", () => {
    const onSubmit = jest.fn();
    render(
      <Provider store={store}>
        {" "}
        <Register onSubmit={onSubmit} />{" "}
      </Provider>
    );
    const fName = screen.getByLabelText("First Name");
    const lName = screen.getByLabelText("Last Name");
    const eMail = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const button = screen.getByRole("button");

    expect(fName).toBeInTheDocument();
    expect(lName).toBeInTheDocument();
    expect(eMail).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeDisabled();

    fireEvent.change(fName, { target: { value: "Muhammed" } });
    fireEvent.change(lName, { target: { value: "Hamza N" } });
    fireEvent.change(eMail, { target: { value: "tester123@gmail.com" } });
    fireEvent.change(password, { target: { value: "Tester@123" } });
    expect(button).toBeEnabled();
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
