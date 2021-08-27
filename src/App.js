import React, { useRef, useState, useEffect } from "react";

import configData from "./config.json";
import Card from "./components/Card.js";
import "./App.scss";

function App() {
  let debounceTimeout;
  const scrollContainer = useRef(null);
  const [totalPhotos, setTotalPhotos] = useState(null);
  const [pagesLoaded, setPagesLoaded] = useState([]);

  const nextPage = pagesLoaded[pagesLoaded.length - 1] + 1;

  const getUrl = (serverId, id, secret) =>
    `https://live.staticflickr.com/${serverId}/${id}_${secret}_w.jpg`;

  const logScroll = () => {
    let updatedTotalPhotos;
    let updatedPagesLoaded;

    const bottom =
      window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight;

    bottom &&
      fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${configData.API_KEY}&text=baby+orangutan&per_page=20&page=${nextPage}&format=json&nojsoncallback=1`
      )
        .then((response) => response.json())
        .then((data) => {
          updatedTotalPhotos = totalPhotos;
          updatedTotalPhotos.page = data.photos.page;
          updatedTotalPhotos.photo.push(...data.photos.photo);

          updatedPagesLoaded = pagesLoaded;
          updatedPagesLoaded.push(data.photos.page);

          setTotalPhotos({ ...updatedTotalPhotos });
          setPagesLoaded(updatedPagesLoaded);
          getPhotographerNames();
        });
  };

  const debounce = () => {
    debounceTimeout && clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(logScroll, 300);
  };

  const getPhotographerNames = () => {
    totalPhotos &&
      totalPhotos.photo.map((item) => {
        let name;
        let updatedTotalPhotos;

        return fetch(
          `https://www.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${configData.API_KEY}&user_id=${item.owner}&format=json&nojsoncallback=1`
        )
          .then((response) => response.json())
          .then((data) => {
            name = data.person.realname
              ? data.person.realname._content
              : data.person.username._content;
            item.photographerName = name;
            updatedTotalPhotos = totalPhotos;

            setTotalPhotos({ ...updatedTotalPhotos });
          });
      });
  };

  useEffect(() => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${configData.API_KEY}&text=baby+orangutan&per_page=20&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalPhotos(data.photos);
        setPagesLoaded([data.photos.page]);
      });
  }, []);

  useEffect(() => {
    getPhotographerNames();
  }, [pagesLoaded]);

  useEffect(() => {
    const container = scrollContainer.current;
    if (container) {
      window.addEventListener("scroll", debounce, false);

      return () => window.removeEventListener("scroll", debounce, false);
    }
  });

  return (
    <div className="container" ref={scrollContainer}>
      {totalPhotos &&
        totalPhotos.photo.map((item, index) => {
          return (
            <Card
              imageUrl={getUrl(item.server, item.id, item.secret)}
              title={item.title}
              name={item.photographerName}
              order={index}
            />
          );
        })}
    </div>
  );
}

export default App;
