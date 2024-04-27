import { useParams } from "react-router-dom";

const SearchBookInCat = () => {
  const { name } = useParams();
  console.log(name);
  return <div></div>;
};

export default SearchBookInCat;
