// start RecentlyAndMost
interface RecentlyAndMostAuthor {
  authorName: string;
  id: number;
}

interface RecentlyAndMostPublisher {
  publisherName: string;
  id: number;
}

interface RecentlyAndMostUser {
  fullname: string;
  id: number;
}

interface RecentlyAndMostCategory {
  categoryName: string;
  id: number;
}

interface RecentlyAndMostReview {
  rate: number;
  comment: string;
  id: number;
  user: RecentlyAndMostUser;
}

export interface RecentlyAndMostBook {
  id: number;
  title: string;
  subTitle: string;
  desc: string;
  coverUrl: string;
  pages: number;
  views: number;
  lang: string;
  releaseDate: string;
  format: string;
  size: number;
  copyright: boolean;
  toBuy: boolean;
  bookUrl: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  uploaderId: number;
  publisherId: number;
  categoryId: number;
  author?: RecentlyAndMostAuthor;
  publisher: RecentlyAndMostPublisher;
  user: RecentlyAndMostUser;
  category: RecentlyAndMostCategory;
  reviews: RecentlyAndMostReview[];
}

interface RecentlyAndMostPayload {
  numOfPages: number;
  books: RecentlyAndMostBook[];
}

export interface RecentlyAndMostRes {
  error: boolean;
  message: string;
  payload: RecentlyAndMostPayload;
}
// end RecentlyAndMost
// start all cats
interface AllCategoriesCategory {
  id: number;
  categoryName: string;
}

interface AllCategoriesPayload {
  categories: AllCategoriesCategory[];
}

export interface AllCategoriesRes {
  error: boolean;
  message: string;
  payload: AllCategoriesPayload;
}
// end all cats
//start sign up
export interface SignUpReq {
  email: string;
  password: string;
  fullname: string;
}
export interface SignUpRes {
  error: boolean;
  message: string;
  payload: {
    user: {
      gender: string | null;
      avatarUrl: string;
      role: string;
      verified: boolean;
      id: number;
      email: string;
      fullname: string;
      phoneNum: string | null;
    };
    token: string;
  };
}
//end sign up
//START getMe
export interface getmeRES {
  error: boolean;
  message: string;
  payload: {
    user: {
      id: number;
      fullname: string;
      phoneNum: string | null;
      gender: string | null;
      avatarUrl: string;
      email: string;
      password: string;
      role: string;
      verified: boolean;
    };
  };
}
//END getMe
//start login
interface loginUser {
  id: number;
  fullname: string;
  phoneNum: string | null;
  gender: string | null;
  avatarUrl: string;
  email: string;
  role: string;
  verified: boolean;
}

export interface LoginRes {
  error: boolean;
  message: string;
  payload: {
    user: loginUser;
    token: string;
  };
}
export interface LoginReq {
  email: string;
  password: string;
}
//end login
//start edit Profile
export interface EditProfileForm {
  avatarUrl: FileList;
  fullname: string;
  email: string;
  phoneNum: string;
  gender: string;
}
export interface editProfileRES {
  error: boolean;
  message: string;
  payload: {
    user: {
      id: number;
      fullname: string;
      phoneNum: string;
      gender: string | null;
      avatarUrl: string;
      email: string;
      role: string;
      verified: boolean;
      updatedAt: string;
    };
    numOfUsersUpdated: number;
  };
}
//end edit Profile
// start books by cat
interface getBookByCat {
  id: number;
  title: string;
  subTitle: string;
  desc: string;
  coverUrl: string;
  pages: number;
  views: number;
  lang: string;
  releaseDate: string;
  format: string;
  size: number;
  copyright: boolean;
  toBuy: boolean;
  bookUrl: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  uploaderId: number;
  publisherId: number;
  categoryId: number;
  author: {
    authorName: string;
    id: number;
  };
  publisher: {
    publisherName: string;
    id: number;
  };
  user: {
    fullname: string;
    id: number;
  };
  category: {
    categoryName: string;
    id: number;
  };
  reviews: ReviewGetBook[]; // Assuming reviews are not yet defined
}

export interface getBookByCatRES {
  error: boolean;
  message: string;
  payload: {
    numOfPages: number;
    books: getBookByCat[];
  };
}
// end books by cat
// start get cat by id
interface CategoryById {
  id: number;
  categoryName: string;
}

export interface CategoryByIdRES {
  error: boolean;
  message: string;
  payload: {
    category: CategoryById;
  };
}
// end get cat by id
//start search Author
interface AuthorSearch {
  id: number;
  authorAvatarUrl: string;
  authorName: string;
  bio: string | null;
  birthDate: string;
  deathDate: string | null;
}

export interface SearchAuthorsRES {
  error: boolean;
  message: string;
  payload: {
    authors: AuthorSearch[];
  };
}
//end search Author
//start Search Book
export interface SearchBook {
  title: string;
  subTitle: string;
  price: number | null;
  format: string;
  desc: string;
  id: number;
  coverUrl: string;
  views: number;
  lang: string;
  copyright: boolean;
  author?: {
    authorName: string;
    id: number;
  };
  category: {
    categoryName: string;
    id: number;
  };
  reviews: ReviewSearchBook[];
}

interface ReviewSearchBook {
  rate: number;
  comment: string;
  id: number;
  user: {
    id: number;
    fullname: string;
    avatarUrl: string;
  };
}

export interface SearchBookRES {
  error: boolean;
  message: string;
  payload: {
    numOfPages: number;
    books: SearchBook[];
  };
}
//end Search Book
//start Get Book By Id
interface getBookById {
  id: number;
  title: string;
  subTitle: string;
  desc: string;
  coverUrl: string;
  pages: number;
  views: number;
  lang: string;
  releaseDate: string;
  format: string;
  size: number;
  copyright: boolean;
  toBuy: boolean;
  bookUrl: string;
  price: number | null;
  authorId: number;
  uploaderId: number;
  publisherId: number;
  categoryId: number;
  author: {
    authorName: string;
    id: number;
  };
  publisher: {
    publisherName: string;
    id: number;
  };
  user: {
    fullname: string;
    id: number;
  };
  category: {
    categoryName: string;
    id: number;
  };
  reviews: ReviewGetBook[];
  createdAt: string;
  updatedAt: string;
  isReviewed: boolean;

  inCart: boolean;
  isBoughtBook: boolean;
  isFav: boolean;
  totalReviewsRate: null | string;
}

interface ReviewGetBook {
  rate: number;
  comment: string;
  id: number;
  user: {
    id: number;
    fullname: string;
    avatarUrl: string;
  };
}

export interface GetBookByIdRES {
  error: boolean;
  message: string;
  payload: {
    book: getBookById;
    recommendations: getBookById[];
  };
}
//end Get Book By Id
// start add review
interface AddReview {
  id: number;
  bookId: number;
  rate: number;
  comment: string;
  userId: number;
  updatedAt: string;
  createdAt: string;
}

export interface AddReviewRES {
  error: boolean;
  message: string;
  payload: {
    review: AddReview;
  };
}
export interface ReviewREQ {
  comment: string;
  rate: number | null;
  bookId: string | undefined | null | number;
}
export interface EditReview {
  rate: number;
  comment: string;
}
// end add review
// start add fav
export interface AddFavRES {
  error: boolean;
  message: string;
  payload: object; // Payload can be of any type
}
// end add fav
//start delete fav
export interface DeleteFav {
  error: boolean;
  message: string;
  payload: object; // Payload can be of any type
}
//end delete fav
//start Get All Review
interface GetAllReviewUser {
  id: number;
  fullname: string;
  avatarUrl: string;
}

export interface GetAllReviews {
  rate: number;
  comment: string;
  createdAt: string;
  id: number;
  user: GetAllReviewUser;
}

interface GetAllReviewPayload {
  numOfPages: number;
  reviews: GetAllReviews[];
}

export interface GetAllReviewRES {
  error: boolean;
  message: string;
  payload: GetAllReviewPayload;
}
//end Get All Review
//start Delete Review
interface DeleteReviewPayload {
  reviewsDeleted: number;
}

export interface DeleteReviewRES {
  error: boolean;
  message: string;
  payload: DeleteReviewPayload;
}

//end Delete Review
//start Get Review by id
interface GetReviewByIdReview {
  id: number;
  rate: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  bookId: number;
  userId: number;
}

interface GetReviewByIdPayload {
  review: GetReviewByIdReview;
}

export interface GetReviewByIdRES {
  error: boolean;
  message: string;
  payload: GetReviewByIdPayload;
}
//end Get Review by id
//start get Author By Id
interface AuthorById {
  id: number;
  authorAvatarUrl: string;
  authorName: string;
  bio: string | null;
  birthDate: string;
  deathDate: string | null;
}

export interface GetAuthorByIdBook {
  id: number;
  title: string;
  subTitle: string;
  desc: string | null;
  coverUrl: string;
  pages: number;
  views: number;
  lang: string;
  releaseDate: string;
  format: string;
  size: number;
  copyright: boolean;
  toBuy: boolean;
  bookUrl: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  uploaderId: number;
  publisherId: number;
  categoryId: number;
  author?: {
    authorName: string;
  };
  publisher: {
    publisherName: string;
  };
  user: {
    fullname: string;
  };
  category: {
    categoryName: string;
  };
}

export interface getAuthorByIdRES {
  error: boolean;
  message: string;
  payload: {
    author: AuthorById;
    books: GetAuthorByIdBook[];
  };
}
//end get Author By Id
//start get publisher by id
interface PublisherByIdPublisher {
  id: number;
  publisherName: string;
  license: string;
}

interface PublisherByIdAuthor {
  authorName: string;
}

interface PublisherByIdUser {
  fullname: string;
}

interface PublisherByIdCategory {
  categoryName: string;
}

interface PublisherByIdBook {
  id: number;
  title: string;
  subTitle: string;
  desc: string;
  coverUrl: string;
  pages: number;
  views: number;
  lang: string;
  releaseDate: string;
  format: string;
  size: number;
  copyright: boolean;
  toBuy: boolean;
  bookUrl: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  uploaderId: number;
  publisherId: number;
  categoryId: number;
  author: PublisherByIdAuthor;
  publisher: PublisherByIdPublisher;
  user: PublisherByIdUser;
  category: PublisherByIdCategory;
}

export interface PublisherByIdResponse {
  error: boolean;
  message: string;
  payload: {
    publisher: PublisherByIdPublisher;
    books: PublisherByIdBook[];
  };
}
//end get publisher by id
// start get allFavs
export interface getAllFavsBook {
  author?: {
    authorName: string;
  };
  id: number;
  title: string;
  subTitle: string;
  desc: string;
  coverUrl: string;
  pages: number;
  views: number;
  lang: string;
  releaseDate: string;
  format: string;
  size: number;
  copyright: boolean;
  toBuy: boolean;
  bookUrl: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  uploaderId: number;
  publisherId: number;
  categoryId: number;
}

interface getAllFavsBookOwnership {
  bookId: number;
  userId: number;
  book: getAllFavsBook;
}

export interface getAllFavs {
  error: boolean;
  message: string;
  payload: {
    books: getAllFavsBookOwnership[];
    numOfPages: number;
  };
}

// end get allFavs
