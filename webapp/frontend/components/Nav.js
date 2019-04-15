import Link from "next/link";

export function Nav() {
  const pages = [
    {
      slug: "Home",
      path: "/"
    },
    {
      slug: "Scraper",
      path: "/scraper"
    }
  ];
  return (
    <nav>
      {pages.map((p, idx) => (
        <span key={p.slug}>
          <Link href={p.path}>
            <a>{p.slug}</a>
          </Link>
          {idx + 1 === pages.length ? "" : " / "}
        </span>
      ))}
      <style jsx>{`
        nav {
          text-align: center;
        }
        a {
          color: inherit;
        }
      `}</style>
    </nav>
  );
}
