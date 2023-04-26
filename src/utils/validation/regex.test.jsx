import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EmailValidator, PasswordValidator } from "./RegexValidator";

describe("Email Regex Validator", (email) => {
  it("email Api valdator", () => {
    render(
      <MemoryRouter>
        <EmailValidator />
      </MemoryRouter>
    );

    const emailRegex = /^[^\s@]+@[^\s@]+$/;

    // return emailRegex.test(email);
  });
});

describe("Email Regex Validator", (password) => {
  it("email Api valdator", () => {
    render(
      <MemoryRouter>
        <PasswordValidator />
      </MemoryRouter>
    );

    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@!?$%^&*-]).{8,20}$/;

    // return passwordRegex.test(password);
  });
});

