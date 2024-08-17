import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./TopPage.css";
import { Link } from "react-router-dom";

interface thread {
  title: string;
  id: string;
}

const TopPage: React.FC = () => {
  const [threads, setThreads] = useState<thread[]>();

  async function getThreadsData(): Promise<void> {
    try {
      //offsetは0から
      const response = await fetch(
        "https://railway.bulletinboard.techtrain.dev/threads?offset=0",
        { method: "GET" }
      );
      const data: thread[] = await response.json();
      setThreads(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getThreadsData();
  }, []);

  useEffect(() => {
    console.log("threads", threads);
  }, [threads]);

  return (
    <div className="toppage">
      <Header />
      <p className="new-thread">新着のスレッド</p>
      {threads?.map((thread) => (
        <Link to={`/threads/${thread.id}`} key={thread.id}>
          <p className="thread">{thread.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default TopPage;
