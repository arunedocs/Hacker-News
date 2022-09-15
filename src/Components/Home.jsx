import React, { useState, useEffect } from "react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import axios from "axios";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Link } from "react-router-dom";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((res) => {
        let newsArray = res.data;
        newsArray = newsArray.splice(0, 20);

        const newsPromises = newsArray.map(async (newsId) => {
          const newsData = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`
          );

          return newsData.data;
        });

        Promise.all(newsPromises).then((news) => {
          setNews(news);
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function saveToBookmark(id) {
    let bookmarks = localStorage.getItem("bookmarks");

    if (!bookmarks) {
      bookmarks = [];
    } else {
      bookmarks = JSON.parse(bookmarks);
    }
    bookmarks.push(id);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  function saveToBookmark(id) {
    let bookmarks = localStorage.getItem("bookmarks");

    if (!bookmarks) {
      bookmarks = [];
    } else {
      bookmarks = JSON.parse(bookmarks);
    }
    bookmarks.push(id);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  return (
    <>
      <div className="container main">
        <h1 className="d-flex justify-content-center title">
          HACKER NEWS - <span>Top 20 News </span>
          <Link to={"/bookmark"}>
            <BookmarkAddedIcon className="bookmarkIcon" />
          </Link>
        </h1>
        <div className="main-card">
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {news.map((e) => {
              return (
                <div
                  key={e.id}
                  className="cards w-auto h-auto col-3 m-4  rounded-3 shadow p-5 mb-5 bg-body rounded"
                >
                  <div className="headlines">
                    <div>
                      <a href={e.url}>{e.title}</a>
                    </div>
                  </div>
                  <h6 className="p-1"> Score : {e.score}</h6>
                  <div className="d-flex justify-content-between">
                    <i className="byAuthor">- {e.by}</i>
                    <button onClick={() => saveToBookmark(e.id)}>
                      <BookmarksIcon className="bookM" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
