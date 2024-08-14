import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import { ThreeDots } from "react-loader-spinner";

const MainSec = lazy(() => import("./components/pages/MainSec"));
const Authors = lazy(() => import("./components/pages/Authors"));
const SignUp = lazy(() => import("./components/pages/SignUp"));
const LogIn = lazy(() => import("./components/pages/LogIn"));
const Profile = lazy(() => import("./components/pages/Profile"));
const BooksByCat = lazy(() => import("./components/pages/BooksByCat"));
const AllBooksInCat = lazy(() => import("./components/layouts/AllBooksInCat"));
const SearchBookInCat = lazy(
  () => import("./components/layouts/SearchBookInCat")
);
const AllAuthors = lazy(() => import("./components/layouts/AllAuthors"));
const SearchAuthor = lazy(() => import("./components/layouts/SearchAuthor"));
const SearchBook = lazy(() => import("./components/pages/SearchBook"));
const BookPage = lazy(() => import("./components/pages/BookPage"));
const AuthorPage = lazy(() => import("./components/pages/AuthorPage"));
const Publisher = lazy(() => import("./components/pages/Publisher"));
const AllFav = lazy(() => import("./components/pages/AllFav"));
const AllCart = lazy(() => import("./components/pages/AllCart"));

function App() {
  return (
    <div className="bg-[#f1f1f1]">
      <Navbar />
      <Suspense
        fallback={
          <div className=" h-[100vh] w-[100vw] flex items-center justify-center">
            <ThreeDots
              visible={true}
              height="75"
              width="75"
              color="#115e59"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<MainSec />} />
          <Route path="/authors" element={<Authors />}>
            <Route index element={<AllAuthors />} />
            <Route path=":name" element={<SearchAuthor />} />
          </Route>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category/:id" element={<BooksByCat />}>
            <Route index element={<AllBooksInCat />} />
            <Route path=":name" element={<SearchBookInCat />} />
          </Route>
          <Route path="/searchBook/:name" element={<SearchBook />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/author/:id" element={<AuthorPage />} />
          <Route path="/publisher/:id" element={<Publisher />} />
          <Route path="/allFav" element={<AllFav />} />
          <Route path="/allCrt" element={<AllCart />} />
        </Routes>
      </Suspense>
      <div className="container m-auto px-4"></div>
    </div>
  );
}

export default App;
