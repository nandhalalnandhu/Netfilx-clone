import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
// import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCard = ({ title, category }) => {
  const [apiData, SetApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGI0NmU0YTJjOTY2OTg3MzFjZmE1NjZiM2QwM2MyZCIsInN1YiI6IjY2M2EwZDU3NjYxMWI0MDEyNzY5YzE2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wrQVAoTr9zd5FMB2vQcC3CU2GROxyxav_aCGzMp9XV8",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => SetApiData(response.results))
      .catch((err) => console.error(err));

    if (cardsRef.current) {
      cardsRef.current.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category, options, handleWheel]); 


  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCard;
