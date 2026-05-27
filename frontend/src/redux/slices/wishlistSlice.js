import {
    createSlice,
} from "@reduxjs/toolkit";


const wishlistItemsFromStorage =
    localStorage.getItem(
        "wishlistItems"
    )
        ? JSON.parse(
            localStorage.getItem(
                "wishlistItems"
            )
        )
        : [];


const wishlistSlice =
    createSlice({

        name: "wishlist",

        initialState: {

            wishlistItems:
                wishlistItemsFromStorage,
        },

        reducers: {

            addToWishlist:
                (state, action) => {

                    const item =
                        action.payload;


                    const exists =
                        state.wishlistItems.find(

                            (x) =>
                                x._id === item._id
                        );


                    if (!exists) {

                        state.wishlistItems.push(
                            item
                        );
                    }


                    localStorage.setItem(

                        "wishlistItems",

                        JSON.stringify(
                            state.wishlistItems
                        )
                    );
                },


            removeFromWishlist:
                (state, action) => {

                    state.wishlistItems =
                        state.wishlistItems.filter(

                            (item) =>

                                item._id !==
                                action.payload
                        );


                    localStorage.setItem(

                        "wishlistItems",

                        JSON.stringify(
                            state.wishlistItems
                        )
                    );
                },
        },
    });


export const {

    addToWishlist,

    removeFromWishlist,

} = wishlistSlice.actions;

export default
    wishlistSlice.reducer;