import { render, screen, waitFor } from "@testing-library/react";
import nock from "nock";
import User from "./User";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "../../../redux/root-reducer/RootReducer";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));
const store = configureStore({
  reducer : RootReducer
});
describe("baseurl", () => {
  it("api baseurl get", () => {
    render(
      <Provider store={store}>
        <User />
      </Provider>
    );
    nock("http:localhost/8080").get("/Signup").reply(200, {
      id: 1,
      firstName: "/value from the api",
    });

    waitFor(() => {
      expect(screen.getByText("/value from the api")).toBeInTheDocument();
    });
  });
});
