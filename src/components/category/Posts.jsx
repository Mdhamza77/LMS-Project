import React from "react";

const Posts = ({ data, handleClick }) => {
  return (
    <div className="posts">
      <div className="ui">
        <div className="ui link cards">
          {data
            .filter((item) => item.category)
            .map((item) => (
              <div className="card" key={item.id}>
                <div className="image">
                  <img
                    src={item.Image}
                    alt="image"
                    onClick={() => handleClick(item.id)}
                  />
                </div>
                <div className="content">
                  <div className="header">{item.title}</div>
                  <div className="meta">
                    <p>"{item.AuthorName}"</p>
                  </div>
                  <div className="description">
                    <b>Price</b>: {item.price}
                  </div>
                </div>
                <div className="extra content">
                  <span className="floated">
                    <b>Book ID : {item.id}</b>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
