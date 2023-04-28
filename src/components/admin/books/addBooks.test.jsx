import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import AddBooks from "./AddBooks";
import * as Router from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Add component api test", () => {
  it("api test render", () => {
    render(
      <MemoryRouter>
        <AddBooks />
      </MemoryRouter>
    );
  });
});

const bookData = {
  title: "Test Book",
  author: "Test Author",
  category: "Test Category",
  description: "Test Description",
  image_url: "https://example.com/test.jpg"
};

test('api check',async () => {
    const mock = new MockAdapter(axios) ;
    mock.onPost("http://localhost:8080/Books", bookData).reply(200); 
    render(
        <Router.MemoryRouter>
            <AddBooks/>
        </Router.MemoryRouter>
    ) ;
    const titleInput = screen.getByLabelText("Book Name");
    fireEvent.change(titleInput, { target: { value: bookData.title } });
    const authorInput = screen.getByLabelText("Author Name");
    fireEvent.change(authorInput, { target: { value: bookData.author } });
    const categoryInput = screen.getByLabelText("Book Category");
    fireEvent.change(categoryInput, { target: { value: bookData.category } });
    const descriptionInput = screen.getByLabelText("Description");
    fireEvent.change(descriptionInput, { target: { value: bookData.description } });
    const imageUrlInput = screen.getByLabelText("Book Image");
    fireEvent.change(imageUrlInput, { target: { value: bookData.image_url } });
    await act(() => {}) ;
});

test('api check',async () => {
    const mock = new MockAdapter(axios) ;
    mock.onPost("http://localhost:8080/Books", bookData).networkError(); 
    render(
        <Router.MemoryRouter>
            <AddBooks/>
        </Router.MemoryRouter>
    ) ;
    const titleInput = screen.getByLabelText("Book Name");
    fireEvent.change(titleInput, { target: { value: bookData.title } });
    const authorInput = screen.getByLabelText("Author Name");
    fireEvent.change(authorInput, { target: { value: bookData.author } });
    const categoryInput = screen.getByLabelText("Book Category");
    fireEvent.change(categoryInput, { target: { value: bookData.category } });
    const descriptionInput = screen.getByLabelText("Description");
    fireEvent.change(descriptionInput, { target: { value: bookData.description } });
    const imageUrlInput = screen.getByLabelText("Book Image");
    fireEvent.change(imageUrlInput, { target: { value: bookData.image_url } });
    await act(() => {}) ;
});

