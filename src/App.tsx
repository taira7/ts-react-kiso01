import { Routes, Route, BrowserRouter } from "react-router-dom";
import TopPage from "./pages/TopPage/TopPage";
import NewThreadsPage from "./pages/NewThreadsPage/NewThreadsPage";
import ThreadPostsPage from "./pages/ThreadPostsPage/ThreadPostsPage";

//rfc rafce

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopPage />}></Route>
          <Route path="/threads/new" element={<NewThreadsPage />}></Route>
          <Route
            path="/threads/:thread_id"
            element={<ThreadPostsPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
