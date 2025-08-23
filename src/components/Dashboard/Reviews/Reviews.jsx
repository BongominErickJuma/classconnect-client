import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { getImageUrl, reviewService } from "../../../Services/api";
import { Card, Button, Badge } from "../../ui";

const Reviews = ({ reviews: initialReviews = [], isEnrolled }) => {
  const { user } = useCurrentUser();
  const [reviews, setReviews] = useState(initialReviews);
  const [count, setCount] = useState(5);
  const [views, setViews] = useState("View All");
  const [editingReview, setEditingReview] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 0, review: "" });
  const { id } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Fixed typo (removed extra 'b')

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
    setIsDeleting(true);
    try {
      await reviewService.deleteReview(id);
      setReviews(reviews.filter((r) => r.rating_id !== id)); // Removed setTimeout
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async () => {
    if (editingReview) {
      // Edit mode
      setIsEditing(true);
      editingReview.rating = newReview.rating;
      editingReview.review = newReview.review;

      try {
        await reviewService.updeteReview(editingReview, editingReview.rating_id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsEditing(false);
      }
    } else {
      // Add mode
      const newRating = {
        student_id: user.user_id,
        rating: newReview.rating,
        review: newReview.review,
      };

      setIsSubmitting(true);
      try {
        const res = await reviewService.createReview(id, newRating);
        if (res.data) {
          const newReview = res.data;
          setReviews([newReview, ...reviews]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }

    setNewReview({ rating: 0, review: "" });
    setEditingReview(null);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Course Reviews
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              {reviews.length} review{reviews.length !== 1 ? 's' : ''} from students
            </p>
          </div>
        </div>

        {reviews.length > 5 && (
          <Button
            onClick={handleToggles}
            variant="ghost"
            size="sm"
          >
            {views === "View All" ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                View All Reviews
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                View Less
              </>
            )}
          </Button>
        )}
      </div>

      {/* Add/Edit Review Form */}
      {isPrivileged && (
        <Card className="border-2 border-dashed border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)]" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
              <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                {editingReview ? "Edit Your Review" : "Share Your Experience"}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {editingReview ? "Update your thoughts about this course" : "Help other students by sharing your thoughts"}
              </p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Rating
            </label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  className={`text-2xl transition-all duration-200 hover:scale-110 ${
                    i < newReview.rating 
                      ? "text-yellow-400 drop-shadow-sm" 
                      : "text-[var(--color-border)] hover:text-yellow-300"
                  }`}
                >
                  ★
                </button>
              ))}
              {newReview.rating > 0 && (
                <span className="ml-2 text-sm text-[var(--color-text-secondary)]">
                  {newReview.rating}/5 stars
                </span>
              )}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Your Review
            </label>
            <textarea
              rows={4}
              value={newReview.review}
              onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
              className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-200 resize-none"
              placeholder="Share your experience with this course. What did you learn? How was the instructor? Would you recommend it to others?"
            />
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              {newReview.review.length}/500 characters
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              variant="primary"
              size="md"
              loading={isSubmitting || isEditing}
              disabled={!newReview.rating || !newReview.review.trim()}
              className="shadow-lg"
            >
              {editingReview ? (
                isEditing ? "Updating Review..." : "Update Review"
              ) : (
                isSubmitting ? "Submitting Review..." : "Submit Review"
              )}
            </Button>
            
            {editingReview && (
              <Button
                onClick={() => {
                  setEditingReview(null);
                  setNewReview({ rating: 0, review: "" });
                }}
                variant="ghost"
                size="md"
              >
                Cancel
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <Card className="text-center" padding="lg">
          <div className="py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              No Reviews Yet
            </h3>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              {isPrivileged 
                ? "Be the first to share your experience with this course!" 
                : "Students haven't shared their experiences yet."}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.slice(0, count).map((rev, ind) => (
            <Card 
              key={ind}
              className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              padding="lg"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={getImageUrl(rev.profile_photo)}
                      alt={rev.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[var(--color-border)] shadow-sm"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+dGggZD0iTTI2IDI2VjI0QzI2IDIyLjg5NTQgMjUuMTA0NiAyMiAyNCAyMkgxNkMxNC44OTU0IDIyIDEzIDIyLjg5NTQgMTQgMjRWMjZNMjIgMTZDMjIgMTguMjA5MSAyMC4yMDkxIDIwIDE4IDIwQzE1Ljc5MDkgMjAgMTQgMTguMjA5MSAxNiAxNkMxNiAxMy43OTA5IDE3Ljc5MDkgMTIgMjAgMTJDMjIuMjA5MSAxMiAyNiAxMy43OTA5IDI2IDE2WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+';
                      }}
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">
                      {rev.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {new Date(rev.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                {/* Rating Display */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-lg ${
                          i < rev.rating ? "text-yellow-400" : "text-[var(--color-border)]"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <Badge variant={rev.rating >= 4 ? "success" : rev.rating >= 3 ? "warning" : "danger"} size="sm">
                    {rev.rating}/5
                  </Badge>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <p className="text-[var(--color-text-primary)] leading-relaxed">
                  {rev.review || (
                    <span className="italic text-[var(--color-text-muted)]">
                      No written review provided
                    </span>
                  )}
                </p>
              </div>

              {/* User Actions */}
              {user?.user_id === rev.student_id && isPrivileged && (
                <div className="flex gap-2 pt-4 border-t border-[var(--color-border)]">
                  <Button
                    onClick={() => handleEdit(rev)}
                    variant="secondary"
                    size="sm"
                    loading={isEditing}
                    disabled={isDeleting}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {isEditing ? "Editing..." : "Edit Review"}
                  </Button>
                  <Button
                    onClick={() => handleDelete(rev.rating_id)}
                    variant="danger"
                    size="sm"
                    loading={isDeleting}
                    disabled={isEditing}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {isDeleting ? "Deleting..." : "Delete Review"}
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
