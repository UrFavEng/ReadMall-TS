import AuthorCard from "./AuthorCard";

const AllAuthors = () => {
  const famousEnglishAuthors: string[] = [
    "Harper Lee",
    "George Orwell",
    "F. Scott Fitzgerald",
    "Jane Austen",
    "J.D. Salinger",
  ];
  return (
    <div className="grid gap-4 px-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {famousEnglishAuthors.map((author, i) => (
        <AuthorCard key={author} author={author} index={i} />
      ))}
    </div>
  );
};

export default AllAuthors;
