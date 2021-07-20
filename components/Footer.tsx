import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import { menuItems } from "../lib/menuItems";

export default function Footer() {
  const { currentUser } = useContext(AuthContext)

  return (
    <footer className="bg-primary p-2">
      <div className="max-w-5xl mx-auto">
        <img
          src="/img/logo-text.svg"
          className="w-1/2 max-w-xs p-3"
          alt={"暗記メーカー"}
        />
        <ul>
          {menuItems
            .filter((nav) => nav.isShow(currentUser))
            .map((it) => (
              <li key={it.title} className="mb-1 ml-2">
                <Link href={it.link}>
                  <a className="text-white text-sm">{it.title}</a>
                </Link>
              </li>
            ))}
        </ul>
        <p className="text-sm text-white text-right">©2021 ke-ta</p>
      </div>
    </footer>
  );
}
