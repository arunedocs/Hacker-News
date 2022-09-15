import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const [news, setNews] = useState([]);
  //   const [bookMark, setBookmark] = useState(0);

  //   useEffect(() => {
  //     axios
  //       .get("https://hacker-news.firebaseio.com/v0/topstories.json")
  //       .then((res) => {
  //         let newsArray = res.data;
  //         newsArray = newsArray.splice(0, 20);

  //         const newsPromises = newsArray.map(async (newsId) => {
  //           const newsData = await axios.get(
  //             `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`
  //           );
  //           // console.log(newsPromises);
  //           return newsData.data;
  //         });

  //         // console.log(newsPromises);

  //
  //         // console.log();
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   }, []);

  useEffect(() => {
    let bookmark = localStorage.getItem("bookmarks");
    if (!bookmark) {
      bookmark = [];
    } else {
      bookmark = JSON.parse(bookmark);
    }
    const newBookmark = bookmark.map(async (id) => {
      const data = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return data.data;
    });

    Promise.all(newBookmark).then((newss) => {
      setNews(newss);
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
  return (
    <>
      <div className="container main">
        <h1 className="d-flex justify-content-center mt-4 title">
          Bookmarks
          <Link to={"/"}>
            <HomeIcon className="bookmarkIcon" />
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

export default Bookmark;
