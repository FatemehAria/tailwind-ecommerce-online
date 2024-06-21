import { faMinus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCart, removeCart } from "../../action";
import Loading from "../../components/Loading/Loading";

const Singleproduct = () => {
  const { id } = useParams();
  const [singlepro, setSinglepro] = useState([]);
  const [singleLoading, setSingleLoading] = useState(true);
  const state = useSelector((state) => state.cartItems);
  console.log(state);
  const dispatch = useDispatch();

  const getSingleProducts = async () => {
    try {
      const { data } = await axios(`https://fakestoreapi.com/products/${id}`);
      setSingleLoading(false);
      setSinglepro([data]);
    } catch (error) {
      setSingleLoading(false);
    }
  };

  useEffect(() => {
    getSingleProducts();
  }, []);

  return (
    <div className="pt-[5%] px-5 mb-8">
      {singleLoading ? (
        <div className="absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2">
          <Loading />
        </div>
      ) : (
        singlepro.map((item) => {
          const itemInCart = state.find((product) => product.id === item.id);
          const qtyInCart = itemInCart ? itemInCart.qty : 0;

          return (
            <div
              key={item.id}
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] xxl:w-[60%]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-0 items-center justify-center mx-auto shadow-2xl p-[3%]">
                <div className="w-[50%] mx-auto">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="flex flex-col gap-8">
                  <h2 className="font-bold text-3xl max-w-xl mx-auto !leading-10 xxxxl:text-5xl xxxxl:max-w-4xl  xxxxl:py-5">
                    {item.title}
                  </h2>
                  <p className="text-xl !leading-8 max-w-lg mx-auto xxl:text-xl xxl:!leading-10 xxxl:text-3xl xxxl:!leading-[3rem] xxxxl:text-5xl xxxxl:max-w-3xl xxxxl:!leading-[4rem]">
                    {item.description}
                  </p>

                  <div className="flex justify-evenly font-bold text-base xxl:text-xl xxxxl:text-3xl ">
                    <p className="text-green-800">${item.price}</p>
                    <p className="flex flex-row gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                      {item.rating.rate}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    {qtyInCart > 0 ? (
                      <button>
                        <div className="flex flex-row items-center gap-3 bg-green-400 px-5 py-3 rounded-lg">
                          <FontAwesomeIcon
                            icon={faMinus}
                            className="cursor-pointer"
                            onClick={() => dispatch(removeCart(item))}
                          />
                          <span>{qtyInCart}</span>
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="cursor-pointer"
                            onClick={() => dispatch(addCart(item))}
                          />
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => dispatch(addCart(item))}
                        className="bg-slate-900 text-white py-2 px-4 rounded-md xxl:text-lg xxxxl:text-4xl"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Singleproduct;
