import { useParams } from "react-router-dom";

const SearchBookInCat = () => {
  const { name } = useParams();
  console.log(name);
  return (
    <div className=" text-center text-custom-teal font-semibold mt-14">
      This page is under construction. Please check back later.
    </div>
  );
};

export default SearchBookInCat;
