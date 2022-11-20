import { FiMenu } from "react-icons/fi";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useToggle } from "../toggle/toggle";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export const Navbar = () => {
  const { state: isVisible, toggle } = useToggle();

  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };

  const signUserOut = async () => {
    await signOut(auth);
    window.location.reload();
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 z-10 flex h-[60px] w-full items-center justify-start bg-zinc-600 px-4 text-neutral-200">
        <FiMenu
          onClick={toggle}
          className="cursor-pointer text-3xl hover:text-green-500 active:text-green-500"
        />
        <h1 className="text-1xl mx-4 select-none font-semibold">
          Angol tanulás
        </h1>
      </header>
      <div className={isVisible ? "sidebarOn" : "sidebarOff"}>
        <div className="w-full">
          <div className="flex items-center justify-end">
            <AiOutlineClose
              onClick={toggle}
              className="cursor-pointer text-3xl font-semibold hover:text-green-500 active:text-green-500"
            />
          </div>
          <h1 className="mb-12 select-none text-center text-3xl font-semibold text-green-400">
            Menü
          </h1>
          <Link
            to="/"
            onClick={toggle}
            className="flex w-full items-center justify-start border-l-8 border-transparent py-4 text-xl hover:border-gray-800 hover:bg-gray-700 active:border-gray-800 active:bg-gray-700"
          >
            <AiOutlineHome className="mx-2" />
            <h1>Kezdőlap</h1>
          </Link>
          {user ? (
            <Link
              to="/create"
              onClick={toggle}
              className="flex w-full items-center justify-start border-l-8 border-transparent py-4 text-xl hover:border-gray-800 hover:bg-gray-700 active:border-gray-800 active:bg-gray-700"
            >
              <AiOutlinePlus className="mx-2" />
              <h1>Új szó hozzáadása</h1>
            </Link>
          ) : (
            ""
          )}
          {user ? (
            <Link
              to="/category"
              onClick={toggle}
              className="flex w-full items-center justify-start border-l-8 border-transparent py-4 text-xl hover:border-gray-800 hover:bg-gray-700 active:border-gray-800 active:bg-gray-700"
            >
              <AiOutlineUnorderedList className="mx-2" />
              <h1>Kategóriák</h1>
            </Link>
          ) : (
            ""
          )}
          {!user ? (
            <button
              onClick={signInWithGoogle}
              className="flex w-full items-center justify-start border-l-8 border-transparent py-4 text-xl hover:border-gray-800 hover:bg-gray-700 active:border-gray-800 active:bg-gray-700"
            >
              <CiLogin className="mx-2" />
              <h1>Sign up</h1>
            </button>
          ) : (
            ""
          )}
          {user ? (
            <button
              onClick={signUserOut}
              className="flex w-full items-center justify-start border-l-8 border-transparent py-4 text-xl hover:border-gray-800 hover:bg-gray-700 active:border-gray-800 active:bg-gray-700"
            >
              <CiLogout className="mx-2" />
              <h1>Sign out</h1>
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="mt-5 flex w-full items-center justify-evenly text-4xl">
          <a href="https://github.com/SimonKaresz" target="blank">
            <AiFillGithub className="cursor-pointer hover:text-neutral-800 active:text-neutral-800" />
          </a>
          <a
            href="https://www.linkedin.com/in/karesz-simon-5419a8247/"
            target="blank"
          >
            <AiFillLinkedin className="cursor-pointer hover:text-neutral-800 active:text-neutral-800" />
          </a>
        </div>
      </div>
    </>
  );
};
