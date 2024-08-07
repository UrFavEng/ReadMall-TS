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
  Publisher,
  AllFav,
} from "./components/index";
function App() {
  return (
    <div className="bg-[#f1f1f1]">
      <Navbar
      // handleChangeCat={handleChangeCat}
      // handleChangeSearch={handleChangeSearch}
      />

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
      </Routes>
      <div className=" container m-auto  px-4"></div>
    </div>
  );
}

export default App;
