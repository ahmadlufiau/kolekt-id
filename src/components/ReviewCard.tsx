import React, { useState } from 'react';
import { Star, ThumbsUp, Calendar, Image as ImageIcon } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [showImages, setShowImages] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      setHelpfulCount(prev => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={review.userAvatar}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span>{review.rating} stars</span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(review.createdAt)}
        </div>
      </div>

      {/* Review Title */}
      <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>

      {/* Review Comment */}
      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <ImageIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Photos</span>
          </div>
          <div className="flex space-x-2">
            {review.images.slice(0, 3).map((image, index) => (
              <button
                key={index}
                onClick={() => setShowImages(!showImages)}
                className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 hover:border-orange-300 transition-colors"
              >
                <img
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {review.images.length > 3 && (
              <div className="w-16 h-16 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
                <span className="text-sm text-gray-600">+{review.images.length - 3}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Helpful Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleHelpfulClick}
          disabled={hasVoted}
          className={`flex items-center space-x-1 text-sm transition-colors ${
            hasVoted
              ? 'text-orange-600'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          <ThumbsUp className={`h-4 w-4 ${hasVoted ? 'fill-current' : ''}`} />
          <span>Helpful ({helpfulCount})</span>
        </button>
      </div>

      {/* Image Modal */}
      {showImages && review.images && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Review Photos</h3>
              <button
                onClick={() => setShowImages(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {review.images.map((image, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard; 