import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import "./ThreadPostsPage.css";

interface postDetail {
  id: string;
  post: string;
}

interface threadContent {
  threadId: string;
  posts: postDetail[];
}

const ThreadPostsPage: React.FC = () => {
  const { thread_id } = useParams<{ thread_id: string }>();

  const [postTitles, setPostTitles] = useState<postDetail[]>([]);

  async function getPostsData(): Promise<void> {
    try {
      const response = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=0`,
        { method: "GET" }
      );

      const data: threadContent = await response.json();
      const result: postDetail[] = data.posts;
      setPostTitles(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPostsData();
    // console.log(thread_id);
  }, []);

  const [postContent, setPostContent] = useState<string>("");

  async function postContentData(post: string): Promise<void> {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: post }),
      };

      const response = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,
        requestOptions
      );
      const data = await response.json();
      console.log("Post created", data);
      getPostsData(); //投稿後の読み込みのため
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (postContent == "") {
      alert("投稿内容を入力して下さい");
    } else {
      postContentData(postContent);
      setPostContent("");
    }
  }

  function handleContentChange(e: any): void {
    setPostContent(e.target.value);
  }

  return (
    <div className="post-allItem-threadPosts">
      <Header></Header>
      {postTitles?.map((postTitle) => (
        <p className="posts" key={postTitle.id}>
          {postTitle.post}
        </p>
      ))}

      <form className="post-items-threadPosts" onSubmit={handleSubmit}>
        <input
          className="post-content"
          placeholder="投稿しよう！"
          value={postContent}
          onChange={handleContentChange}
        ></input>
        <button type="submit" className="post-button-threadPosts">
          投稿
        </button>
      </form>
    </div>
  );
};

export default ThreadPostsPage;
