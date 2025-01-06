// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useGetBooksQuery } from "@/redux/api/books";
// import scss from "./HomeCards.module.scss";
// import defaultBook from "@/assets/Icons/defaultBook.webp";
// import star0 from "@/assets/Icons/star0.png";
// import star1 from "@/assets/Icons/star1.png";
// import star2 from "@/assets/Icons/star2.png";
// import star3 from "@/assets/Icons/star3.png";
// import star4 from "@/assets/Icons/star4.png";
// import star5 from "@/assets/Icons/star5.png";
// import priceIcon from "@/assets/Icons/HomePrice.png";
// import like from "@/assets/Icons/like.png";
// import likeActive from "@/assets/Icons/likeActive.png";
// import Link from "next/link";

// const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];
// const BOOKS_TO_DISPLAY = 12;

// interface Book {
//     id: number;
//     book_name: string;
//     author: string;
//     price: number;
//     average_rating: number;
//     book_images: Array<{ book_images: string }>;
//     janre: Array<{ janre_name: string }>;
// }

// interface BookCardProps {
//     book: Book;
//     isLiked: boolean;
//     onLikeToggle: (id: number) => void;
//     onNavigate: (id: number) => void;
// }

// const BookCard: React.FC<BookCardProps> = ({
//     book,
//     isLiked,
//     onLikeToggle,
//     onNavigate,
// }) => {
//     const [showModal, setShowModal] = useState(false);

//     const handleAddToCart = () => {
//         setShowModal(true);
//         setTimeout(() => {
//             setShowModal(false);
//         }, 2000);
//     };

//     return (
//         <div className={scss.card}>
//             <Image
//                 onClick={() => onNavigate(book.id)}
//                 width={150}
//                 height={200}
//                 quality={80}
//                 className={scss.bookImage}
//                 src={book.book_images[0]?.book_images || defaultBook}
//                 alt={`Cover of ${book.book_name}`}
//                 priority
//             />
//             <div className={scss.cardInfo}>
//                 <div className={scss.rating}>
//                     <Image
//                         width={110}
//                         height={20}
//                         className={scss.ratingImage}
//                         src={STAR_RATINGS[book.average_rating] || star0}
//                         alt={`Rating: ${book.average_rating || 0} stars`}
//                     />
//                 </div>
//                 <h2 className={scss.name}>{book.book_name}</h2>
//                 <h3 className={scss.author}>{book.author}</h3>
//                 <p className={scss.genre}>
//                     Жанр:
//                     {book.janre.map((genre, i) => (
//                         <span key={genre.janre_name} className={scss.janre}>
//                             {genre.janre_name}
//                             {i < book.janre.length - 1 && ", "}
//                         </span>
//                     ))}
//                 </p>
//                 <div className={scss.confirm}>
//                     <div className={scss.price}>
//                         <Image
//                             width={20}
//                             className={scss.priceIcon}
//                             height={20}
//                             src={priceIcon}
//                             alt="Price icon"
//                         />
//                         {book.price} c
//                     </div>
//                     <div className={scss.actions}>
//                         <button
//                             onClick={handleAddToCart}
//                             className={scss.button}
//                             aria-label="Add to cart"
//                         >
//                             В корзину
//                         </button>
//                         {showModal && (
//                             <div className={scss.modal}>
//                                 <p>Товар добавлен в корзину✓</p>
//                             </div>
//                         )}
//                         <button
//                             className={scss.buttonLike}
//                             onClick={() => onLikeToggle(book.id)}
//                             aria-label={
//                                 isLiked
//                                     ? "Remove from favorites"
//                                     : "Add to favorites"
//                             }
//                         >
//                             <Image
//                                 width={24}
//                                 height={24}
//                                 src={isLiked ? likeActive : like}
//                                 alt={
//                                     isLiked
//                                         ? "Remove from favorites"
//                                         : "Add to favorites"
//                                 }
//                             />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

// };

// const LoadingState = () => (
//     <div className={scss.loaderBlock}>
//         <div className={scss.loader}></div>
//     </div>
// );

// const ErrorState = () => (
//     <div className={scss.loaderBlock}>
//         <div>Ошибка загрузки данных. Попробуйте позже.</div>
//     </div>
// );

// const HomeCards: React.FC = () => {
//     const router = useRouter();
//     const [likedItems, setLikedItems] = useState<number[]>([]);
//     const { data = [], isLoading, isError } = useGetBooksQuery();

//     if (isLoading) return <LoadingState />;
//     if (isError) return <ErrorState />;

//     const toggleLike = (id: number) => {
//         setLikedItems((prev) =>
//             prev.includes(id)
//                 ? prev.filter((item) => item !== id)
//                 : [...prev, id]
//         );
//     };

//     const navigateToBook = (id: number) => {
//         if (!id) {
//             console.error("Invalid book ID:", id);
//             return;
//         }
//         router.push(`/books/${id}`);
//     };

//     const latestBooks = data.slice(-BOOKS_TO_DISPLAY);

//     return (
//         <section className={scss.HomeCards}>
//             <div className="container">
//                 <div className={scss.content}>
//                     <h1 className={scss.title}>КАТАЛОГ</h1>
//                     <div className={scss.cards}>
//                         {latestBooks.map((book: Book) => (
//                             <BookCard
//                                 key={book.id}
//                                 book={book}
//                                 isLiked={likedItems.includes(book.id)}
//                                 onLikeToggle={toggleLike}
//                                 onNavigate={navigateToBook}
//                             />
//                         ))}
//                     </div>
//                     <Link href={"/catalog"} className={scss.buttonToCatalog}>
//                         Смотреть еще
//                     </Link>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HomeCards;"use client";
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetBooksQuery } from "@/redux/api/books";
import {
  useGetFavoriteQuery,
  useAddFavoriteItemMutation,
  useRemoveFavoriteItemMutation,
} from "@/redux/api/favorite";
import { useGetMeQuery } from "@/redux/api/auth";
import scss from "./HomeCards.module.scss";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";
import star0 from "@/assets/Icons/star0.png";
import star1 from "@/assets/Icons/star1.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import priceIcon from "@/assets/Icons/HomePrice.png";
import Link from "next/link";

const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];
const BOOKS_TO_DISPLAY = 12;

interface Book {
  id: number;
  book_name: string;
  author: string;
  price: number;
  average_rating: number;
  janre: { janre_name: string }[];
  book_images: { book_images: string }[];
}

interface FavoriteItem {
  id: number;
  user_favorite: number;
  katalog_books_like: number;
}

const HomeCards: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [cartModal, setCartModal] = useState<boolean>(false);

  const { data: books = [], isLoading: isBooksLoading } = useGetBooksQuery();
  const { data: favoriteData = [], isLoading: isFavLoading } = useGetFavoriteQuery();

  const { data: meData, isLoading: isMeLoading } = useGetMeQuery();
  const userId = meData?.id || null;

  const [addFavorite] = useAddFavoriteItemMutation();
  const [removeFavorite] = useRemoveFavoriteItemMutation();

  const toggleLike = async (bookId: number) => {
    if (!userId) {
      alert("Ошибка: Пользователь не авторизован.");
      return;
    }

    const isLiked = favoriteData.some(
      (item) => item.katalog_books_like.id === bookId
    );

    try {
      if (isLiked) {
        const favoriteItem = favoriteData.find(
          (item) => item.katalog_books_like.id === bookId
        );
        if (favoriteItem?.id) {
          await removeFavorite(favoriteItem.id).unwrap();
        }
      } else {
        await addFavorite({
          katalog_books_like: bookId,
          user_favorite: userId,
          like_favorite: true,
        }).unwrap();
      }
    } catch (error) {
      console.error("Ошибка изменения избранного:", error);
    }
  };

  const addToCart = (bookId: number) => {
    if (!cartItems.includes(bookId)) {
      setCartItems((prev) => [...prev, bookId]);
      setCartModal(true);
      setTimeout(() => setCartModal(false), 2000);
    }
  };

  const navigateToBook = (id: number) => {
    router.push(`/books/${id}`);
  };

  if (isBooksLoading || isFavLoading || isMeLoading)
    return (
      <div className={scss.loaderBlock}>
        <div className={scss.loader}></div>
      </div>
    );

  const latestBooks: Book[] = books.slice(-BOOKS_TO_DISPLAY);

  return (
    <section className={scss.HomeCards}>
      <div className="container">
        <div className={scss.content}>
          <h1 className={scss.title}>КАТАЛОГ</h1>
          <div className={scss.cards}>
            {latestBooks.map((book: Book) => (
              <div key={book.id} className={scss.card}>
                <Image
                  onClick={() => navigateToBook(book.id)}
                  width={150}
                  height={200}
                  quality={80}
                  className={scss.bookImage}
                  src={book.book_images[0]?.book_images || defaultBook}
                  alt={`Обложка ${book.book_name}`}
                  priority
                />
                <div className={scss.cardInfo}>
                  <div className={scss.rating}>
                    <Image
                      width={110}
                      height={20}
                      className={scss.ratingImage}
                      src={STAR_RATINGS[book.average_rating] || star0}
                      alt={`Рейтинг: ${book.average_rating || 0} звёзд`}
                    />
                  </div>
                  <h2 className={scss.name}>{book.book_name}</h2>
                  <h3 className={scss.author}>{book.author}</h3>
                  <p className={scss.genre}>
                    Жанр:{" "}
                    {book.janre.map((genre, i) => (
                      <span key={genre.janre_name} className={scss.janre}>
                        {genre.janre_name}
                        {i < book.janre.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <div className={scss.confirm}>
                    <div className={scss.price}>
                      <Image
                        width={20}
                        className={scss.priceIcon}
                        height={20}
                        src={priceIcon}
                        alt="Иконка цены"
                      />
                      {book.price} c
                    </div>
                    <div className={scss.actions}>
                      <button
                        className={scss.button}
                        onClick={() => addToCart(book.id)}
                      >
                        {cartItems.includes(book.id)
                          ? "В корзине"
                          : "В корзину"}
                      </button>
                      <button
                        className={scss.buttonLike}
                        onClick={() => toggleLike(book.id)}
                        aria-label={
                          favoriteData.some(
                            (item) => item.katalog_books_like.id === book.id
                          )
                            ? "Удалить из избранного"
                            : "Добавить в избранное"
                        }
                      >
                        <Image
                          width={24}
                          height={24}
                          src={
                            favoriteData.some(
                              (item) => item.katalog_books_like.id === book.id
                            )
                              ? likeActive
                              : like
                          }
                          alt={
                            favoriteData.some(
                              (item) => item.katalog_books_like.id === book.id
                            )
                              ? "Удалить из избранного"
                              : "Добавить в избранное"
                          }
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/catalog" className={scss.buttonToCatalog}>
            Смотреть еще
          </Link>
        </div>
        {cartModal && (
          <div className={scss.modal}>
            <p>Товар добавлен в корзину✓</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeCards;
