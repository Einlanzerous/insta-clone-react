import React, { useState, useEffect } from "react";
import { Post } from "./Post";
import "./App.css";
import { Button } from "@mui/material";

const BASE_URL = "http://localhost:8000";

function App() {
  const [posts, setPosts] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/post/all`)
      .then((response) => {
        const json = response.json();
        console.log(json);

        if (response.ok) {
          return json;
        }
        throw response;
      })
      .then((data) =>
        data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      )
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="app_header">
        <img className="app_headerImage" src="instaCloneLogo.png" alt="Insta-Clone" />

        <div>
          <Button onClick={() => setOpenLogin(true)}>Login</Button>
          <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
        </div>
      </div>
      <div className="app_posts">
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;
