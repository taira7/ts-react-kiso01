import React from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import "./NewThreadsPage.css";

const NewThreadsPage: React.FC = () => {
  const [newThreadTitle, setNewThreadTitle] = useState<string>("");

  async function postNewthreadData(threadTitle: string): Promise<void> {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: threadTitle }),
      };

      const response = await fetch(
        "https://railway.bulletinboard.techtrain.dev/threads",
        requestOptions
      );
      const data = await response.json();
      console.log("Thread created", data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleTitleChange(e: any): void {
    console.log(e.target.value);
    setNewThreadTitle(e.target.value);
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (newThreadTitle == "") {
      alert("タイトルを入力して下さい");
    } else {
      postNewthreadData(newThreadTitle);
      window.location.href = "/";
    }
  }

  return (
    <div className="post-allItem-newThread">
      <Header></Header>
      <div>
        <p className="new-thread">スレッド新規作成</p>
        <form className="post-items-newThread" onSubmit={handleSubmit}>
          <input
            className="thread-title"
            placeholder="スレッドタイトル"
            value={newThreadTitle}
            onChange={handleTitleChange}
          ></input>
          <button type="submit" className="post-button-newThread">
            投稿
          </button>
        </form>
        <Link to="/" className="toTopLink">
          Topに戻る
        </Link>
      </div>
    </div>
  );
};

export default NewThreadsPage;
