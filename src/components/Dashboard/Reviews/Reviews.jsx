import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { reviewService } from "../../../Services/api";

const Reviews = ({ reviews: initialReviews = [], isEnrolled }) => {
  const { user } = useCurrentUser();
  const [reviews, setReviews] = useState(initialReviews);
  const [count, setCount] = useState(5);
  const [views, setViews] = useState("View All");
  const [editingReview, setEditingReview] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 0, review: "" });
  const { id } = useParams();

  const handleToggles = () => {
    setCount((prev) => (prev === 5 ? 100 : 5));
    setViews((prev) => (prev === "View All" ? "View Less" : "View All"));
  };

  const isPrivileged = user?.role === "student" && isEnrolled === true;

  const handleEdit = (rev) => {
    setEditingReview(rev);
    setNewReview({ rating: rev.rating, review: rev.review });
  };

  const handleDelete = async (id) => {
    try {
      await reviewService.deleteReview(id);

      setTimeout(() => {
        setReviews(reviews.filter((r) => r.rating_id !== id));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (editingReview) {
      // Edit mode
      editingReview.rating = newReview.rating;
      editingReview.review = newReview.review;

      try {
        await reviewService.updeteReview(editingReview, editingReview.rating_id);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Add mode
      const newRating = {
        student_id: user.user_id,
        rating: newReview.rating,
        review: newReview.review,
      };

      try {
        const res = await reviewService.createReview(id, newRating);

        if (res.data) {
          const newReview = res.data;
          setReviews([newReview, ...reviews]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    setNewReview({ rating: 0, review: "" });
    setEditingReview(null);
  };

  return (
    <div className="shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-base)]">Course Reviews</h2>
        <Link onClick={handleToggles}>{views}</Link>
      </div>

      {/* Add/Edit Form */}
      {isPrivileged && (
        <div className="mb-6 border p-4 rounded bg-[var(--color-light-bg)]">
          <h3 className="font-semibold mb-2">{editingReview ? "Edit Your Review" : "Add a Review"}</h3>
          <div className="flex items-center mb-2 space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                className={`cursor-pointer text-xl ${i < newReview.rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            rows={3}
            value={newReview.review}
            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
            className="w-full border rounded p-2 mb-2 text-sm"
            placeholder="Write your thoughts.... Click the stars above for ratings.You can not add more than one review"
          ></textarea>
          <button onClick={handleSubmit} className="px-4 py-1 text-white bg-[var(--color-accent)] rounded text-sm">
            {editingReview ? "Update" : "Submit"}
          </button>
        </div>
      )}

      {/* Review Items */}
      <div className="space-y-4">
        {reviews.slice(0, count).map((rev) => (
          <div key={rev.rating_id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between mb-1">
              <h3 className="font-medium">{user?.id === rev.student_id ? "You" : "Student"}</h3>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < rev.rating ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">{new Date(rev.rated_at).toLocaleDateString()}</p>
            <p className="text-gray-700">{rev.review || "No comment"}</p>

            {user?.user_id === rev.student_id && isPrivileged && (
              <div className="mt-2 space-x-3 text-sm">
                <button onClick={() => handleEdit(rev)} className="px-2 rounded-xl w-14">
                  Edit
                </button>
                <button onClick={() => handleDelete(rev.rating_id)} className=" px-2 rounded-xl w-14">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        {reviews.length === 0 && <p className="text-sm text-gray-500">No reviews yet.</p>}
      </div>
    </div>
  );
};

export default Reviews;
