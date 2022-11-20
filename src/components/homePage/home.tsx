import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Home = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };
  return (
    <div className="relative top-[60px] flex w-full flex-col items-center justify-center">
      <h1 className="mt-32 text-center text-3xl font-semibold text-green-400">
        Angol szavak tanulása egyszerűen
      </h1>
      {!user ? (
        <p className="mt-8 text-center text-lg text-white">
          Bejelentkezéshez Google fiók szükséges!
        </p>
      ) : (
        ""
      )}
      {user ? (
        <div className="mt-16 flex w-full flex-col items-center justify-center text-white">
          <Link className="home_nav mb-6" to="/create">
            Új szó hozzáadása
          </Link>
          <Link className="home_nav" to="/category">
            Kategóriák
          </Link>
        </div>
      ) : (
        <div className="mt-2 flex w-full flex-col items-center justify-center text-white">
          <button onClick={signInWithGoogle} className="home_nav mb-6">
            Bejelentkezés
          </button>
        </div>
      )}
    </div>
  );
};
