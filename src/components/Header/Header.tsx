import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-primary  ">
      <div className="container w-full font-bold text-xl text-white">
        <Link to="/">Star Wars Explorer</Link>
      </div>
    </header>
  );
}
