import React, { useState, useEffect } from "react";
import { getCat } from "../../services/book/book.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cleanup } from "@testing-library/react";
const Category = () => {
  const [books, getBooks] = useState([]);
  const navigate = useNavigate();
  const get =  () => {
     getCat()
      .then((res) => {
        getBooks(res.data);
      })
      .catch((err) => {console.log(err)
        toast(`cannot display book list`)
      });
  };

  useEffect(() => {
    get();
    return cleanup()
  },[]);

  const Category = (category) => {
    navigate("/category/books/" + category);
  };

  return (
    <div className="cat">
      {" "}
      <div className="ui five column grid" style={{marginLeft : "-1em" , marginTop : "4em" , width : "120em" ,border :"0.5em solid cornflowerblue"  }}>
        {books.map((post) => (
          <div className="column" key={post.id} >
            <div className="ui fluid card">
              <div className="image">
                <img
                  style={{height : "35em"}}
                  src={post.Img}
                  alt="image"
                  onClick={() => Category(post.category)}
                />
              </div>
              <div className="content">
                <a className="header">{post.category}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
