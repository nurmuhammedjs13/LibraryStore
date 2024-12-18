import React from "react";
import scss from "./CardComments.module.scss";

const CardComments = () => {
    const commentsList = [
        {
            id: 1,
            userProfile: "randomImg",
            name: "Осмонова Нурай",
            date: "24.10.2021",
            comment: "Очень понравились уроки. Все более чем понятно! ",
        },
        {
            id: 2,
            userProfile: "randomImg",
            name: "Эгембердиева Кунсулуу",
            date: "24.10.2021",
            comment:
                "Классный урок, первый раз вижу такое подробное объяснение всего происходящего ",
        },
        {
            userProfile: "randomImg",
            id: 3,
            name: "Таалайбек Ыманкулов",
            date: "24.10.2021",
            comment:
                "Как мне кажется,  в конце видео, необходимо было сказать о том, что информация - это то(в данном случае число) с помощью чего можно устранить некую неопределенность(неизвестность) А так вроде все замечательно. ",
        },
        {
            userProfile: "randomImg",
            id: 4,
            name: "Осмонова Нурай",
            date: "24.10.2021",
            comment:
                "Мой первый день в мире программирования ✨ Первый ролик 😊 Вы просто гениально объясняете, продолжаю смотреть 😉  Спасибо! ",
        },
    ];

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
                        {commentsList.map((comment) => (
                            <div key={comment.id} className={scss.comment}>
                                <div className={scss.commenLeft}>
                                    <div className={scss.commentInfo}>
                                        <div className={scss.commentName}>
                                            <h3 className={scss.name}>
                                                {comment.name}
                                            </h3>
                                            {""}
                                            <span>{comment.date}</span>
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
