import React, { useState } from "react";
import scss from "./CardComments.module.scss";
import { useGetRatingsQuery, usePostRatingMutation } from "@/redux/api/rating";

const CardComments = () => {
    const { data = [], isError, isLoading } = useGetRatingsQuery();
    const [postRating] = usePostRatingMutation();
    const [commentText, setCommentText] = useState<string>("");
    const [stars, setStars] = useState<number>(5);

    const formatDate = (dateString: string) => {
        const [day, month, year] = dateString.split("-");
        return `${month}.${day}.${year}`;
    };

    const handlePostComment = async () => {
        if (!commentText.trim()) {
            alert("Комментарий не может быть пустым.");
            return;
        }
        try {
            const newComment = await postRating({
                data: { comment: commentText, stars },
            }).unwrap();
            console.log("Комментарий успешно добавлен:", newComment);
            setCommentText("");
        } catch (error) {
            console.error("Ошибка при публикации комментария:", error);
            if (error instanceof Error) {
                alert(`Ошибка: ${error.message}`);
            } else {
                alert("Произошла неизвестная ошибка при публикации.");
            }
        }
    };

    return (
        <section className={scss.CardComments}>
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.commentTitle}>Комментарии</h1>
                    <div className={scss.commentSection}>
                        <input
                            type="text"
                            placeholder="Оставить отзыв"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className={scss.commentInput}
                        />
                        <button
                            onClick={handlePostComment}
                            className={scss.publicButton}
                        >
                            Опубликовать
                        </button>
                        {isLoading ? (
                            <p>Загрузка комментариев...</p>
                        ) : isError ? (
                            <p>Ошибка загрузки комментариев</p>
                        ) : (
                            data.map((comment) => (
                                <div key={comment.id} className={scss.comment}>
                                    <div className={scss.commenLeft}>
                                        <div className={scss.commentInfo}>
                                            <div className={scss.commentName}>
                                                <h3 className={scss.name}>
                                                    {
                                                        comment.user_rating
                                                            .username
                                                    }
                                                </h3>
                                                <span>
                                                    {formatDate(
                                                        comment.created_date
                                                    )}
                                                </span>
                                            </div>
                                            <p>{comment.comment}</p>
                                        </div>
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
