import React, { useState, useEffect } from "react";

import configData from "./config.json";
import "./App.scss";

function App() {
  const [totalPhotos, setTotalPhotos] = useState(null);
  const [pagesLoaded, setPagesLoaded] = useState([]);

  const getUrl = (serverId, id, secret) =>
    `https://live.staticflickr.com/${serverId}/${id}_${secret}_w.jpg`;

  useEffect(() => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${configData.API_KEY}&text=baby+orangutan&per_page=20&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalPhotos(data.photos);
        setPagesLoaded(data.photos.page);
      });
  }, []);

  useEffect(() => {
    totalPhotos &&
      totalPhotos.photo.map((item) => {
        let name;

        fetch(
          `https://www.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${configData.API_KEY}&user_id=${item.owner}&format=json&nojsoncallback=1`
        )
          .then((response) => response.json())
          .then((data) => {
            name = data.person.realname._content;
            console.log("name", name);
            console.log("data", data);
            item.photographerName = name;
          });
      });
  }, [totalPhotos]);

  console.log("totalPhotos", totalPhotos);
  console.log("pagesLoaded", pagesLoaded);
  console.log("configData.API_KEY", configData.API_KEY);
  return (
    <div className="App">
      <header className="App-header">
        {totalPhotos && (
          <div>
            <ul>
              {totalPhotos.photo.map((item) => (
                <li>
                  {item.title}
                  <img src={getUrl(item.server, item.id, item.secret)} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
