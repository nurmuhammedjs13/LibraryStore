namespace RATINGS {
  type GetRatingResponse = {
    id: number;
    user_rating: number;
    books: number;
    stars: number;
    comment: string;
    created_date: string;
  }[];

  type GetRatingRequest = void;

  type PostRatingRequest = {
    // id: number;
    user_rating: number;
    books: number;
    stars: number;
    comment: string;
    // created_date: string;
  };

  type PostRatingResponse = {
    user_rating: number;
    books: number;
    stars: number;
    comment: string;
  };
}
