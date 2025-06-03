import { useState } from 'react';

type Props = {
  reviewCompleted: boolean;
  setReviewCompleted: (value: boolean) => void;
};

const ReviewSection: React.FC<Props> = ({
  reviewCompleted,
  setReviewCompleted,
}) => {
  const [ratingExperience, setRatingExperience] = useState(0);
  const [ratingQuality, setRatingQuality] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (
    question: 'experience' | 'quality',
    rating: number
  ) => {
    if (question === 'experience') {
      setRatingExperience(rating);
    } else {
      setRatingQuality(rating);
    }
  };

  const renderStars = (
    currentRating: number,
    question: 'experience' | 'quality'
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(question, star)}
            className={`text-4xl ${
              star <= currentRating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = () => {
    console.log({
      ratingExperience,
      ratingQuality,
      comment,
    });
    setReviewCompleted(true);
  };

  return (
    <>
      {reviewCompleted ? (
        <div className="flex flex-col items-center justify-center text-center p-8 space-y-6">
          <div className="bg-yellow-100 rounded-full p-4">
            <span className="text-yellow-600 text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Thanks for your feedback!
          </h2>
          <p className="text-gray-600 max-w-md">
            We really appreciate you taking the time to share your thoughts.
            Your feedback helps make this app better!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
          >
            🔄 Start a new search
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="pb-2">
              How would you rate your overall experience with this application?
            </p>
            {renderStars(ratingExperience, 'experience')}
          </div>

          <div>
            <p className="pb-2">What about the quality of the responses?</p>
            {renderStars(ratingQuality, 'quality')}
          </div>

          <div>
            <p className="pb-2">
              Anything else you would like to comment about?
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Share your thoughts..."
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default ReviewSection;
