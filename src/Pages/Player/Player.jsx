import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

  const {id} = useParams ();
  const navigate =useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGI0NmU0YTJjOTY2OTg3MzFjZmE1NjZiM2QwM2MyZCIsInN1YiI6IjY2M2EwZDU3NjYxMWI0MDEyNzY5YzE2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wrQVAoTr9zd5FMB2vQcC3CU2GROxyxav_aCGzMp9XV8",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results [0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img src={back_arrow} alt="" onClick={()=> {navigate(-2)}} />
      <iframe
        width="90%"
        height="90%"
        src={`http://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.Type}</p>
      </div>
    </div>
  );
};

export default Player;
