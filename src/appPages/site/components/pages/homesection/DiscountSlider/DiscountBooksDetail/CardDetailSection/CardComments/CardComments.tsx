import React from "react";
import scss from "./CardComments.module.scss";
import { useGetRatingsQuery } from "@/redux/api/rating";

const CardComments = () => {
    const { data = [], isError, isLoading } = useGetRatingsQuery();

    const formatDate = (dateString: string) => {
        const [day, month, year] = dateString.split("-");
        return `${month}.${day}.${year}`;
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
                            className={scss.commentInput}
                        />
                        <button className={scss.publicButton}>
                            Опубликовать
                        </button>
                        {data.map((comment) => (
                            <div key={comment.id} className={scss.comment}>
                                <div className={scss.commenLeft}>
                                    <div className={scss.commentInfo}>
                                        <div className={scss.commentName}>
                                            <h3 className={scss.name}>
                                                {comment.user_rating.username}
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
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardComments;
