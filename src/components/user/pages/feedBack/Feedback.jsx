import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, TextArea } from "semantic-ui-react";
import { postFeedBack } from "./../../../../services/home/home.service";
import { Textarea } from "../../../../utils/validation/RegexValidator";
import { toast } from "react-toastify";

const Feedback = () => {
  const navigate = useNavigate();

  let user = sessionStorage.getItem("email");
  const [feedback, setFeedback] = useState("");
  const [err, setErr] = useState("");

  const Post = () => {
    const feed = {
      User: user,
      feed: feedback,
    };
    if (!Textarea(feedback)) return setErr("Enter Validated textarea");
    else
      postFeedBack(feed)
        .then((res) => {
          setFeedback(res.data);
          navigate("/home");
        })
        .catch((err) => { console.log(err.data) 
           toast(`Cannot display data 404 error`)  
        });
  };

  return (
    <div className="feedback">
      <div className="card">
        <Form>
          <Form.Field>
            <label>User</label>
            <input
              type="text"
              placeholder="user Name"
              required
              value={user}
              readOnly
            />
          </Form.Field>
          <Form.Field>
            <label>Feed Back</label>
            <TextArea
              type="text"
              placeholder="Write FeedBack about Website"
              minlength="10"
              maxlength="200"
              required
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Form.Field>
          {err.length > 0 && <p style={{ color: "red" }}>{err}</p>}
          <Button className="blue" onClick={Post}>
            Submit
          </Button>
          <Button className="red" onClick={() => navigate("/home")}>
            Go Back
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Feedback;
