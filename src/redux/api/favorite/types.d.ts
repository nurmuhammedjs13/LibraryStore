namespace FAVORITE {
    type GetFavoriteItemsReaponse = [
        {
            id: number;
            title: string;
            author: string;
            price: number;
            image: string;
        }
    ];
    type GetFavoriteItemsRequest = void;

    type CreateFavoriteItemRequest = {
        title: string;
        author: string;
        price: number;
        image: string;
    };

    type DeleteFavoriteItemRequest = number;
}