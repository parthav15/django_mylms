import React, { useState } from 'react';

function CourseRating() {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };

    return (
        <div className="course-rating">
            <h4>Rate this course:</h4>
            <div className="rating-stars">
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={handleRatingChange}
                            />
                            <span className="icon">★</span>
                        </label>
                    );
                })}
            </div>
            <p>You rated this course: {rating}</p>
        </div>
    );
}

export default CourseRating;