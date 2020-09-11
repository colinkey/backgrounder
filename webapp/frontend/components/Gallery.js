import React from "react";

export function Gallery(props) {
  return (
    <div className="gallery">
      {React.Children.map(props.children, child => React.cloneElement(child, { page: props.url }))}
      <style jsx>{`
        .gallery {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
