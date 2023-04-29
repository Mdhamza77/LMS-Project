import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import AddCategory from './AddCategory';
import * as Router from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Add component api test", () => {
  it("api test render", () => {
    render(
      <MemoryRouter>
        <AddCategory />
      </MemoryRouter>
    );
  });
});

const catData = {
  category: "Test Category",
  image_url: "https://example.com/test.jpg"
};

test('api check',async () => {
    const mock = new MockAdapter(axios) ;
    mock.onPost("http://localhost:8080/Category", catData).reply(200); 
    render(
        <Router.MemoryRouter>
            <AddCategory/>
        </Router.MemoryRouter>
    ) ;
    const titleInput = screen.getByLabelText("Category Name");
    fireEvent.change(titleInput, { target: { value: catData.category } });
    const authorInput = screen.getByLabelText("Category Image");
    fireEvent.change(authorInput, { target: { value: catData.image_url } });
    await act(() => {}) ;
});

test('api check',async () => {
    const mock = new MockAdapter(axios) ;
    mock.onPost("http://localhost:8080/Category", catData).networkError(); 
    render(
        <Router.MemoryRouter>
            <AddCategory/>
        </Router.MemoryRouter>
    ) ;
    const titleInput = screen.getByLabelText("Category Name");
    fireEvent.change(titleInput, { target: { value: catData.category } });
    const authorInput = screen.getByLabelText("Category Image");
    fireEvent.change(authorInput, { target: { value: catData.image_url } });
    await act(() => {}) ;
});

