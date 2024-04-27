import AuthorCard from "./AuthorCard";

const AllAuthors = () => {
  const famousEnglishAuthors: string[] = [
    "William Shakespeare",
    "Jane Austen",
    "Charles Dickens",
    "J.K. Rowling",
    "George Orwell",
    "Agatha Christie",
    "Virginia Woolf",
    "William Wordsworth",
  ];
  return (
    <div className="grid gap-4 px-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {famousEnglishAuthors.map((author) => (
        <AuthorCard key={author} author={author} />
      ))}
    </div>
  );
};

export default AllAuthors;
