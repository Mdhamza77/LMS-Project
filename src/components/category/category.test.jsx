import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Category from "./Category";
import * as Router from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("category component api test", () => {
  it("api test render", () => {
    render(
      <MemoryRouter>
        <Category />
      </MemoryRouter>
    );
  });
});

const Cat = [
  {
    id: 1,
    category: "Thriller",
    Img: "https://m.media-amazon.com/images/I/81EwJoYM6jL.jpg",
  },
  {
    id: 2,
    category: "History",
    Img: "https://m.media-amazon.com/images/I/41-0lBgMGvL.jpg",
  },
  {
    id: 3,
    category: "Crime",
    Img: "https://m.media-amazon.com/images/I/71bhR8QDlPL.jpg",
  },
  {
    id: 4,
    category: "Drama",
    Img: "https://m.media-amazon.com/images/I/71l+w6TvBML.jpg",
  },
  {
    category: "Fantasy",
    Img: "https://img.freepik.com/premium-photo/open-magic-book-with-fairy-tales_763713-618.jpg",
    id: 5,
  },
];


test('api check',async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({id: 3}) ;
    const mock = new MockAdapter(axios) ;
    mock.onGet("http://localhost:8080/Category").reply(200, Cat); 
    render(
        <Router.MemoryRouter>
            <Category/>
        </Router.MemoryRouter>
    ) ;
    await act(() => {}) ;
});

test('api check',async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({id: 3}) ;
    const mock = new MockAdapter(axios) ;
    mock.onGet("http://localhost:8080/Category").networkError(); 
    render(
        <Router.MemoryRouter>
            <Category/>
        </Router.MemoryRouter>
    ) ;
    await act(() => {}) ;
});

