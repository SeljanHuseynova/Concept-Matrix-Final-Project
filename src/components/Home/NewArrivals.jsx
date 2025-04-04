import React, { useContext, useEffect } from "react";
import { GoHeart } from "react-icons/go";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/accountSlice";
import { Link } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageContext } from "../../context/LanguageProvider";
import { WishListContext } from "../../context/WishListProviderNew";

const NewArrivals = ({ products }) => {
  const {t} = useContext(LanguageContext);
  const { toggleWishlist, wishlist } = useContext(WishListContext);
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const newArrivals = products?.filter((item) => [1, 2, 3, 5].includes(item.id));
  const currentUser = useSelector((state) => state.users?.currentUser);
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    if (!currentUser) {
       toast.error(t("alert.please-log-in"));
      return;
    }
    dispatch(addToCart({ userId: currentUser.id, product }));
  };

  return (
    <div className="new-arrivals">
      <div className="title" data-aos="fade-up">
        <h2>{t("home.what-new")}</h2>
        <span>{t("home.shop-new-arrivals")}</span>
      </div>
      <div className="products-container">
        <div className="products">
          {newArrivals?.map((product) => (
            <div
              key={product.id}
              data-id={product.id}
              className="product-cart"
              style={{ backgroundImage: `url(${product.images[0]})` }}
              data-aos="fade-up"
            >
              <div className="top">
                <span className="product-brand" data-aos="fade-down">
                  {product.brand}
                </span>
                <h2 className="product-name" data-aos="fade-right">
                  {product.name}
                </h2>
              </div>

              <div className="bottom">
                <span className="price" data-aos="zoom-in">
                  ${product.price}
                </span>
              </div>

              <Link
                to={`/products/${product.id}`}
                className="hover-buttons"
                data-aos="fade-left"
              >
                <div
                  className={`wishlist ${
                    wishlist.some((item) => item.id === product.id)
                      ? "in-wishlist"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product);
                  }}
                >
                  <GoHeart
                    className={`icon ${
                      wishlist.some((item) => item.id === product.id)
                        ? "filled"
                        : ""
                    }`}
                  />
                </div>

                <div className="btn">
                  <button
                    className="add-to-cart"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
