import MockAdapter from "axios-mock-adapter";
import * as Router from "react-router-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import axios from "axios";
import EditBooks from "./EditBooks";
import UBook from "../../bookList/UBook";
const mock = new MockAdapter(axios);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));
it("should edit book successfully", async () => {
  const id = "1";
  const book = {
    title: "Test Book",
    Description: "This is a test book",
    AuthorName: "Test Author",
    Quantity: "10",
    price: "200",
    Image: "test-image.jpg",
    category: "Test Category",
  };

  // Mock the API call
  mock.onPut(`/api/books/${id}`, book).reply(200, {});

  // Render the component
  render(<EditBooks />);

  // Set the input values
  fireEvent.change(screen.getByLabelText("Description"), {
    target: { value: book.Description },
  });
  fireEvent.change(screen.getByLabelText("Book Image"), {
    target: { value: book.Image },
  });
  fireEvent.change(screen.getByLabelText("Book Quantity"), {
    target: { value: book.Quantity },
  });
  fireEvent.change(screen.getByLabelText("Book Price"), {
    target: { value: book.price },
  });
});
