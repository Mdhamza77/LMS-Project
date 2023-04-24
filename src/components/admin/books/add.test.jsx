import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import AddBooks from "./AddBooks";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));
describe("AddBooks", () => {
  it("should handle submit", async () => {
    const addBooks = jest.fn();
    const navigate = jest.fn();
    const { getByLabelText, getByText } = render(
      <AddBooks addBooks={addBooks} navigate={navigate} />
    );


    await act(async () => {
      fireEvent.change(getByLabelText("Book Name"), {
        target: { value: "Book Name" },
      });
      fireEvent.change(getByLabelText("Author Name"), {
        target: { value: "Author Name" },
      });
      fireEvent.change(getByLabelText("Book Image"), {
        target: { value: "book-image.jpg" },
      });
      fireEvent.change(getByLabelText("Book Category"), {
        target: { value: "Category" },
      });
      fireEvent.change(getByLabelText("Description"), {
        target: { value: "Book Description" },
      });
      fireEvent.change(getByLabelText("Book Quantity"), {
        target: { value: "10" },
      });
      fireEvent.change(getByLabelText("Book Price"), {
        target: { value: "100" },
      });
      fireEvent.submit(getByText("Add"));
    });

    expect(addBooks).toHaveBeenCalledWith({
      title: "Book Name",
      AuthorName: "Author Name",
      Description: "Book Description",
      Quantity: "10",
      price: "100",
      Image: "book-image.jpg",
      category: "Category",
    });
    expect(navigate).toHaveBeenCalledWith("/home");
  });
});