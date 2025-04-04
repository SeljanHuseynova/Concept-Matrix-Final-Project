import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewModal from "./ReviewModal";
import { headers, productsUrl } from "../../supabase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageContext } from "../../context/LanguageProvider";

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const {t} = useContext(LanguageContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${productsUrl}?id=eq.${id}&select=reviews`,
          { headers }
        );

        const reviewsArray =
          response.data.length > 0 ? response.data[0].reviews : [];
        setReviews(reviewsArray);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    if (id) {
      fetchReviews();
    }
  }, [id]);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
    toast.success("We appreciate your review!");
  };

  return (
    <div className="reviews">
      <div className="top-part">
        <h1>{t("reviews.name")}</h1>
        <button onClick={() => setModalOpen(true)}>{t("reviews.write")}</button>
      </div>
      <div className="review-list">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p className="name">{review.name}</p>
              {[...Array(5)].map((_, starIndex) => (
                <span
                  key={starIndex}
                  className={starIndex < review.rate ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
              <h3 className="headline">{review.headLine}</h3>
              <p className="text">{review.text}</p>
            </div>
          ))
        ) : (
          <p>{t("reviews.no-review")}</p>
        )}
      </div>

      {modalOpen && (
        <ReviewModal
          closeModal={() => setModalOpen(false)}
          addReview={addReview}
          productId={id}
        />
      )}
    </div>
  );
};

export default Reviews;
