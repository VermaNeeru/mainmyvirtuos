import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    clearCartWishlist,
    removeItemWishlist,
    moveItemWishlist,
} from "../../store/wishlistSlice";
import Success from "@components/Popups/success";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { CartItem } from "src/store/types";
// import wishlistdata from "./wishlistdata.json";
import { addItem, updateItem } from "src/store/cartSlice";

import {
    HeartIcon,
    ShoppingCartIcon,
    TrashIcon,
} from "@heroicons/react/20/solid";
import Notification from "@components/Notifications/notification";

const Wishlist = () => {
    interface RootState {
        wishlist: CartItem[];
    }
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showSuccessMessagedelete, setshowSuccessMessagedelete] =
        useState<boolean>(false);

    const wishlist = useSelector((state: RootState) => state.wishlist);
    console.log(wishlist);
    const dispatch = useDispatch();
    const handleDelete = (id: string) => {
        dispatch(removeItemWishlist(id));
        setshowSuccessMessagedelete(true);
    };
    const handleMove = (
        id: string,
        title: string,
        category: string,
        image: string,
        description: string,
        link: string,
        price: string
        // quantity: number
    ) => {
        const itemToAdd: CartItem = {
            id,

            title,
            category,
            image,
            description,
            link,
            price,

            quantity: 0,
            email: "",
        };
        dispatch(addItem(itemToAdd));
        // dispatch(updateItem({ id, quantity }));
        // console.log(dispatch(updateItem({ id, quantity })));
        dispatch(removeItemWishlist(id));

        // router.push({ pathname: '/cart', query });
        setShowSuccessMessage(true);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setshowSuccessMessagedelete(false);
            setShowSuccessMessage(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);
    return (

        <>
            <div className="cart-main-container">
                <div className="cart-container">
                    {showSuccessMessage && (
                        <Notification message="Item moved to cart Successful!" />
                    )}
                    {showSuccessMessagedelete && (
                        <Notification message="Item deleted Successful!" />
                    )}
                    {wishlist.length !== 0 ? (
                        <>
                            <div className="cart-page">
                                {/* <HeartIcon className="h-8 w-8 text-red" /> */}
                                <h1 className="font-bold text-xl text-[red]">My Wishlist!</h1>
                                {/* <h5>{wishlist.length} Items</h5> */}

                                <div
                                    className="cart-header-cartvalue"
                                    style={{ backgroundColor: "red" }}
                                >
                                    <h5>{wishlist.length}</h5>
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                    {wishlist.length === 0 ? (
                        <div className="empty-wishlist">
                            <FaceFrownIcon className="h-24 w-24 text-gray-700" />
                            <h5>No Items in Wishlist!</h5>
                        </div>
                    ) : (
                        <>
                            <ul role="list" className="space-y-3">
                                {wishlist.map((data) => (
                                    <li
                                        key={data.id}
                                        className="overflow-hidden rounded-md bg-white px-2 py-2 drop-shadow-xl"
                                    >
                                        <div className="flex gap-2" key={data.id}>
                                            <div className="flex items-center">
                                                <img
                                                    className="wishlist-service-img rounded-full"
                                                    src={data.image}
                                                />
                                            </div>
                                            <div className="w-60 flex justify-center flex-col">
                                                <h3 className="text-sm text-sky-600 font-semibold">
                                                    {data.title}
                                                </h3>
                                                <p>{data.category}</p>
                                                <p className="cart-price">₹{data.price}</p>
                                            </div>
                                            <div className="flex flex-col gap-1 justify-center">
                                                <ShoppingCartIcon
                                                    className="h-6 w-6 text-gray-500"
                                                    onClick={() =>
                                                        handleMove(
                                                            data.id,
                                                            data.title,
                                                            data.category,
                                                            data.image,
                                                            data.description,
                                                            // data.quantity,
                                                            data.link,
                                                            data.price
                                                        )
                                                    }
                                                />
                                                <TrashIcon
                                                    className="h-6 w-6 text-gray-500"
                                                    onClick={() => handleDelete(data.id)}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {/* <div className="cart-main-container">
                <div className="cart-body">
                  {wishlist.map((data) => (
                    <div className="cart-card " key={data.id}>
                      <div className="w-30">
                        <img
                          className="cart-service-img rounded-full"
                          src={data.image}
                        />
                      </div>
                      <div className="w-60">
                        <h3 className="text-sm text-sky-600 font-semibold">
                          {data.title}
                        </h3>
                        <p>{data.category}</p>
                        <p className="cart-price">{data.price}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <ShoppingCartIcon
                          className="h-6 w-6 text-gray-500"
                          onClick={() =>
                            handleMove(
                              data.id,
                              data.title,
                              data.category,
                              data.image,
                              data.description,

                              // data.quantity,
                              data.link,
                              data.price
                            )
                          }
                        />
                        <TrashIcon
                          className="h-6 w-6 text-gray-500"
                          onClick={() => handleDelete(data.id)}
                        />
                      </div>
                    </div> */}
                            {/* ))}
                </div>
              </div> */}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Wishlist;
