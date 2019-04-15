import { Nav } from "./Nav";

export function Layout(props) {
  return (
    <div className="layout">
      <Nav />
      {props.children}
      <style jsx>{`
        .layout {
          padding: 10px;
        }
      `}</style>
    </div>
  );
}
