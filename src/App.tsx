import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { Create } from "./components/create/create";
import { Category } from "./components/category/category";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { Environment } from "./components/category/category-pages/environment";
import { Calendar } from "./components/category/category-pages/calendar";
import { Human } from "./components/category/category-pages/human";
import { Health } from "./components/category/category-pages/health";
import { Clothes } from "./components/category/category-pages/clothes";
import { Computer } from "./components/category/category-pages/computer";
import { Flora } from "./components/category/category-pages/flora";
import { Fauna } from "./components/category/category-pages/fauna";
import { Fruits } from "./components/category/category-pages/fruits";
import { Foodstuffs } from "./components/category/category-pages/foodstuffs";
import { Abroad } from "./components/category/category-pages/abroad";
import { Activity } from "./components/category/category-pages/activity";
import { Art } from "./components/category/category-pages/art";
import { ChildrensWord } from "./components/category/category-pages/childrensworld";
import { City } from "./components/category/category-pages/city";
import { Drinks } from "./components/category/category-pages/drinks";
import { Natural } from "./components/category/category-pages/natural";
import { Sport } from "./components/category/category-pages/sport";
import { Traveling } from "./components/category/category-pages/traveling";
import { Math } from "./components/category/category-pages/math";
import { HomeCat } from "./components/category/category-pages/home";
import { Home } from "./components/homePage/home";

function App() {
  const [user] = useAuthState(auth);
  const CustomRoute = () => {
    const customRoute = useRoutes([
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: `/category/environment`,
        element: <Environment />,
      },
      {
        path: `/category/calendar`,
        element: <Calendar />,
      },
      {
        path: `/category/human`,
        element: <Human />,
      },
      {
        path: `/category/health`,
        element: <Health />,
      },
      {
        path: `/category/clothes`,
        element: <Clothes />,
      },
      {
        path: `/category/home`,
        element: <HomeCat />,
      },
      {
        path: `/category/computer`,
        element: <Computer />,
      },
      {
        path: `/category/flora`,
        element: <Flora />,
      },
      {
        path: `/category/fauna`,
        element: <Fauna />,
      },
      {
        path: `/category/foodstuffs`,
        element: <Foodstuffs />,
      },
      {
        path: `/category/fruits`,
        element: <Fruits />,
      },
      {
        path: `/category/drinks`,
        element: <Drinks />,
      },
      {
        path: `/category/city`,
        element: <City />,
      },
      {
        path: `/category/traveling`,
        element: <Traveling />,
      },
      {
        path: `/category/abroad`,
        element: <Abroad />,
      },
      {
        path: `/category/sport`,
        element: <Sport />,
      },
      {
        path: `/category/children_s_world`,
        element: <ChildrensWord />,
      },
      {
        path: `/category/art`,
        element: <Art />,
      },
      {
        path: `/category/natural`,
        element: <Natural />,
      },
      {
        path: `/category/math`,
        element: <Math />,
      },
      {
        path: `/category/activity`,
        element: <Activity />,
      },
    ]);
    return customRoute;
  };

  return (
    <div className="App">
      <>
        {user ? (
          <Router>
            <Navbar />
            <CustomRoute />
          </Router>
        ) : (
          <Router>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </Router>
        )}
      </>
    </div>
  );
}

export default App;
