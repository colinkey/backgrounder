export function GlobalStyle() {
  return (
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        font-size: 0.9em;
        text-transform: lowercase;
        background: #efefef;
      }
    `}</style>
  );
}
