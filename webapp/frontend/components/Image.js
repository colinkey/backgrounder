export function Image(props) {
  return (
    <a href={props.src} target="_blank" rel="noopener noreferrer">
      <img
        className="wallpaper-thumbnail"
        style={{ maxWidth: "100%", borderRadius: "4px", display: "block" }}
        src={props.src}
        alt={props.alt}
      />
    </a>
  );
}
