import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar, Button } from "@mui/material"

const BASE_URL = "http://localhost:8000";

function Post({ post }) {
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (post.image_url_type === "absolute") {
      setImageUrl(post.image_url);
    } else {
      setImageUrl(`${BASE_URL}/${post.image_url}`);
    }
  }, []);

  useEffect(() => {
    setComments(post.comments);
  }, []);

  return (
    <div className="post">
      <div className="post_header">
        <Avatar alt="post.user.username" src="/" />
        <div className="post_header_info">
          <h3>{post.user.username}</h3>
          <Button className="post_delete">Delete</Button>
        </div>
      </div>

      <img className="post_img" src={imageUrl} alt="post" />

      <h4 className="post_message">{post.caption}</h4>

      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}:</strong> {comment.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export { Post };
