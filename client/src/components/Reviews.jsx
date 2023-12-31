import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className="row row-cols-3 mb-2">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="card text-white bg-primary mb-3 mr-4"
          style={{ width: "30%" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span className="font-weight-bold">{review.name}</span>
            <span>
              <StarRating rating={review.rating} />
            </span>
          </div>
          <div className="card-body">
            <div className="card-text">{review.review}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
