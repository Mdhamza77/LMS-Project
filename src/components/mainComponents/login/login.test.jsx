import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { Provider } from "react-redux";
import RootReducer from "../../../redux/root-reducer/RootReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: RootReducer,
});

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => mockedUsedNavigate
}));

describe("Login", () => {
  it("should render the login form", () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(getByText("Login")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByText("Login")).toBeDisabled();
  });

  it("should enable the login button when email and password are entered", () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password");
    expect(getByText("Login")).toBeEnabled();
  });

  it("should show an error message when email is invalid", async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "invalid email" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput).toHaveValue("invalid email");
    expect(passwordInput).toHaveValue("password");

    fireEvent.click(getByText("Login"));

    await waitFor(() => {
      expect(getByText("Enter valid email Id")).toBeInTheDocument();
    });
  });

  it("should show an error message when password is invalid", async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("short");

    fireEvent.click(getByText("Login"));

    await waitFor(() => {
      expect(getByText("Enter validated password")).toBeInTheDocument();
    });
  });
});
