import Router from "next/router";

import { Image } from "./Image";

import { deleteFetch } from "../util";

export function Card(props) {
  const { pathname, query } = props.page;

  const handleDelete = () => {
    deleteFetch(`/image/${props.name}`);
    Router.push(query.offset ? `/?offset=${query.offset}` : pathname);
  };

  return (
    <div className="card">
      <Image src={props.url} alt={props.title} />
      <div className="card-details">
        <h3 className="card-title">{props.title}</h3>
        <p className="card-subreddit">{props.subreddit}</p>
        <button className="nah" onClick={handleDelete}>
          🚫 Nah
        </button>
      </div>
      <style jsx>{`
        h3,
        p {
          padding: 0;
          margin: 0;
        }
        .card {
          overflow: hidden;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
          border-radius: 4px;
          position: relative;
          width: 95%;
          max-width: 450px;
          max-height: 450px;
          margin: 10px auto;
        }
        .card-details {
          background-color: rgba(0, 0, 0, 0.5);
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 10px;
          color: #eee;
        }
        .nah {
          border: 0;
          background: transparent;
          color: #aaa;
        }
        .nah:hover {
          color: #eee;
        }
      `}</style>
    </div>
  );
}
