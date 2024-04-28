import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  MainSec,
  Navbar,
  Authors,
  SignUp,
  LogIn,
  Profile,
  BooksByCat,
  AllBooksInCat,
  SearchBookInCat,
  AllAuthors,
  SearchAuthor,
  SearchBook,
  BookPage,
  AuthorPage,
} from "./components/index";
import { useState } from "react";
function App() {
  const [loadingChangeSearch, setLoadingChangeSearchState] =
    useState<boolean>(false);
  const [loadingChangeState, setLoadingChangeState] = useState<boolean>(false);
  const [loadingChangeCatState, setLoadingChangeCatState] =
    useState<boolean>(false);

  const handleChangeCat = () => {
    setLoadingChangeCatState(true);
    setTimeout(() => {
      setLoadingChangeCatState(false);
    }, 2000);
  };
  const handleClick = () => {
    setLoadingChangeState(true);
    setTimeout(() => {
      setLoadingChangeState(false);
    }, 2000);
  };
  const handleChangeSearch = () => {
    setLoadingChangeSearchState(true);
    setTimeout(() => {
      setLoadingChangeSearchState(false);
    }, 2000);
  };
  const [loadingChangeBook, setLoadingChangeBook] = useState<boolean>(false);
  const handleChangeBook = () => {
    setLoadingChangeBook(true);
    setTimeout(() => {
      setLoadingChangeBook(false);
    }, 2000);
  };
  return (
    <div className="bg-[#f1f1f1]">
      <Navbar
        handleChangeCat={handleChangeCat}
        handleChangeSearch={handleChangeSearch}
      />

      <Routes>
        <Route
          path="/"
          element={
            <MainSec
              handleChangeBook={handleChangeBook}
              handleChangeCat={handleChangeCat}
              handleChangeSearch={handleChangeSearch}
            />
          }
        />
        <Route
          path="/authors"
          element={
            <Authors
              handleClick={handleClick}
              handleChangeCat={handleChangeCat}
            />
          }
        >
          <Route index element={<AllAuthors />} />
          <Route
            path=":name"
            element={<SearchAuthor loadingChangeState={loadingChangeState} />}
          />
        </Route>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/category/:id"
          element={
            <BooksByCat
              loadingChangeCatState={loadingChangeCatState}
              handleChangeCat={handleChangeCat}
            />
          }
        >
          <Route
            index
            element={<AllBooksInCat handleChangeBook={handleChangeBook} />}
          />
          <Route path=":name" element={<SearchBookInCat />} />
        </Route>
        <Route
          path="/searchBook/:name"
          element={
            <SearchBook
              handleChangeBook={handleChangeBook}
              loadingChangeSearch={loadingChangeSearch}
              handleChangeSearch={handleChangeSearch}
              handleChangeCat={handleChangeCat}
              loadingChangeCatState={loadingChangeCatState}
            />
          }
        />
        <Route
          path="/book/:id"
          element={
            <BookPage
              handleChangeBook={handleChangeBook}
              loadingChangeBook={loadingChangeBook}
              handleChangeCat={handleChangeCat}
              handleChangeSearch={handleChangeSearch}
            />
          }
        />
        <Route
          path="/author/:id"
          element={
            <AuthorPage
              handleClick={handleClick}
              handleChangeBook={handleChangeBook}
              handleChangeCat={handleChangeCat}
            />
          }
        />
      </Routes>
      <div className=" container m-auto  px-4"></div>
    </div>
  );
}

export default App;
