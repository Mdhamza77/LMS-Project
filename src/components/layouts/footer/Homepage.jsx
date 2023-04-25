import React, { useState, useEffect } from "react";

import {
  getHomeData,
  getCards,
  getFeedBack,
} from "./../../../services/home/home.service";
import { toast } from "react-toastify";
const Homepage = () => {
  const [feedback, getFeedB] = useState([]);
  const [card, getCard] = useState([]);
  const [home, getHom] = useState([]);

  const get = () => {
    getHomeData()
      .then((res) => getHom(res.data))
      .catch((err) => {
        console.log(err);
        toast(`request data failed`);
      });
  };

  const getFeed = () => {
    getFeedBack()
      .then((res) => {
        getFeedB(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast(`request data failed`);
      });
  };

  const getCardss = () => {
    getCards()
      .then((res) => {
        getCard(res.data);
      })
      .catch((err) => {
        console.log(err.data);
        toast(`request data failed`);
      });
  };

  useEffect(() => {
    get();
    getFeed();
    getCardss();
  }, []);

  return (
    <div>
      <div>
        <div id="segment">
          {home.map((item) => (
            <div key={item.id}>
              <img className="img" src={item.img} alt="img" />
              <h1>{item.title}</h1>
              <p>{item.About}</p>
              <p className="ui center">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="ui">
          <div className="ui link cards">
            {card.map((item) => (
              <div className="card" key={item.id}>
                <div className="image">
                  <img src={item.img} alt="Img" />
                </div>
                <div className="content">
                  <div className="header">{item.title}</div>
                  <div className="meta">
                    <a href="/">"{item.author}"</a>
                  </div>
                  <div className="description">{item.content}</div>
                </div>
                <div className="extra content">
                  <span className="floated">{item.published}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {feedback.map((feed) => (
          <div className="uis" key={feed.id}>
            <section className="review" id="review">
              <h1 className="heading">
                {" "}
                <span></span>{" "}
              </h1>

              <div className="box-container">
                <div>
                  <div className="box">
                    <div className="stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <p>"{feed.feed}"</p>
                    <div className="user">
                      <img
                        src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg"
                        alt="Img"
                      />
                      <div className="user-info">
                        <h3>{feed.User}</h3>
                        <span>Happy Explorers</span>
                      </div>
                    </div>
                    <span className="fas fa-quote-right"></span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>

      <div>
        <section className="footer">
          <div className="box-container">
            <div className="box">
              <h3>quick links</h3>
              <a href="#Home">home</a>
              <a href="#segment">about</a>
              <a href="#review">review</a>
            </div>

            <div className="box">
              <h3>contact info</h3>
              <a href="/">9080724529</a>
              <a href="/">example@gmail.com</a>
              <a href="/">Chennai, india - 6000028</a>
            </div>
          </div>

          <div className="credit">
            {" "}
            created by{" "}
            <span>
              <i className="copyright icon"></i>Hamza
            </span>{" "}
            | all rights reserved{" "}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
