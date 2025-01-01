import React from 'react'
import Button from './Button'

function BookCard({book, onFavoriteClick}) {
    return (
        <div className="book-card">
          <h3>{book.title}</h3>
           <p>{book.description}</p>
            <Button onClick={()=> onFavoriteClick(book._id)} >
                {book.isFavorite ? "Remove from favorite" : "Add to favorite"}
            </Button>
       </div>
    );
}

export default BookCard;