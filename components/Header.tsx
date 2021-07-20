import Link from "next/link";
import { useContext, useState } from "react";
import Transition from "react-transition-group/cjs/Transition";
import { menuItems } from "../lib/menuItems";
import { AuthContext } from "./authContext";
import Toast from "./Toast";

export default function Header() {
  const { currentUser } = useContext(AuthContext);
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <div>
      <header className="bg-primary">
        <div className="flex mx-3">
          <Link href="/">
            <a>
              <img
                src="/img/logo.svg"
                className="h-12 p-1"
                alt={"暗記メーカー"}
              />
            </a>
          </Link>
          <div className="flex-grow" />
          <div className="hidden lg:block my-auto">
            <ul className="text-white">
              {menuItems
                .filter((nav) => nav.isShow(currentUser))
                .map((nav) => (
                  <li key={nav.title} className="px-3 text-sm inline">
                    <Link href={nav.link}>
                      <a onClick={nav.action}>{nav.title}</a>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <button
            className="focus:outline-none lg:hidden"
            aria-label={"メニューボタン"}
            onClick={() => setIsShowMenu(!isShowMenu)}
          >
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <Transition in={isShowMenu} timeout={300}>
          {(status) => {
            return (
              <div
                className={[
                  "z-20",
                  "w-full",
                  "h-full",
                  "fixed",
                  "text-white",
                  "bg-primary",
                  "overflow-y-auto",
                  "p-3",
                  "top-0",
                  `fade-${status}`,
                ].join(" ")}
                onClick={() => setIsShowMenu(false)}
              >
                <ul className="flex flex-col justify-center ml-auto mr-auto text-left w-2/3 my-12">
                  {menuItems
                    .filter((nav) => nav.isShow(currentUser))
                    .map((nav) => (
                      <li key={nav.title} className="p-4 text-xl">
                        <Link href={nav.link}>
                          <a onClick={nav.action}>{nav.title}</a>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            );
          }}
        </Transition>
      </header>
      <Toast/>
    </div>
  );
}
