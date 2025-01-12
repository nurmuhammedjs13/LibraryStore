import React, { useState, useMemo } from "react";
import scss from "./CardComments.module.scss";
import { useGetRatingsQuery, usePostRatingMutation } from "@/redux/api/rating";
import { useGetMeQuery } from "@/redux/api/auth";

interface CardCommentsProps {
    id: number;
}

const CardComments: React.FC<CardCommentsProps> = ({ id }) => {
    const { data: userData } = useGetMeQuery();
    const { data = [], isError, isLoading } = useGetRatingsQuery();
    const [postRating] = usePostRatingMutation();
    const [commentText, setCommentText] = useState<string>("");
    const [stars, setStars] = useState<number>(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userId = userData?.id || null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const handlePostComment = async () => {
        if (!userId) {
            alert("Вы должны быть авторизованы, чтобы оставить комментарий.");
            return;
        }

        if (!commentText.trim()) {
            alert("Комментарий не может быть пустым.");
            return;
        }

        setIsSubmitting(true);
        try {
            const ratingData = {
                
                user_rating: userId,
                books: id,
                stars,
                comment: commentText,
            };

            await postRating(ratingData).unwrap();
            setCommentText("");
            setStars(5);
        } catch (error: any) {
            if (error?.status === 401) {
                alert("Ваша сессия истекла. Пожалуйста, войдите снова.");
            } else {
                alert("Произошла ошибка при публикации комментария. Попробуйте позже.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredComments = useMemo(
        () => data.filter((rating) => rating.books === id),
        [data, id]
    );

    return (
        <section className={scss.CardComments}>
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.commentTitle}>Комментарии</h1>
                    <div className={scss.commentSection}>
                        <div className={scss.inputSection}>
                            <textarea
                                placeholder="Оставить отзыв"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className={scss.commentInput}
                            />
                            <div className={scss.starSelector}>
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className={`${scss.star} ${
                                            index < stars ? scss.active : ""
                                        }`}
                                        onClick={() => setStars(index + 1)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={handlePostComment}
                                className={scss.publicButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Публикация..." : "Опубликовать"}
                            </button>
                        </div>

                        {isLoading ? (
                            <p className={scss.loadingMessage}>Загрузка комментариев...</p>
                        ) : isError ? (
                            <p className={scss.errorMessage}>Ошибка загрузки комментариев</p>
                        ) : filteredComments.length === 0 ? (
                            <p className={scss.emptyMessage}>Комментариев пока нет.</p>
                        ) : (
                            filteredComments.map((comment) => (
                                <div key={comment.id} className={scss.comment}>
                                    <div className={scss.commentInfo}>
                                        <div className={scss.commentName}>
                                            <div className={scss.starRating}>
                                                {[...Array(5)].map((_, index) => (
                                                    <span
                                                        key={index}
                                                        className={`${scss.star} ${
                                                            index < comment.stars ? scss.active : ""
                                                        }`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span>{formatDate(comment.created_date)}</span>
                                        </div>
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardComments;
