export function Gallery(props) {
  return (
    <div className="gallery">
      {props.children}
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
