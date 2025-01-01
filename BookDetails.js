import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../components/Forms';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getBookById, updateBook, deleteBook, favoriteBook } from '../services/api';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const fetchedBook = await getBookById(id);
        setBook(fetchedBook);
        setDescription(fetchedBook.description);
      } catch (err) {
        setError(err.message || 'Failed to load book details');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleUpdate = async (e) => {
      e.preventDefault();
      try {
         const updatedBook = await updateBook(id, {description});
         setBook(updatedBook);
         setEditMode(false);
      } catch (err) {
        setError(err.message || 'Failed to update the book')
      }
  };

    const handleDelete = async () => {
        try {
            await deleteBook(id);
             navigate('/home');
         } catch (err) {
          setError(err.message || 'Failed to delete the book')
         }
    };
    const handleFavoriteClick = async (bookId) => {
      try {
         await favoriteBook(bookId);
         setBook(prevBook => ({ ...prevBook, isFavorite: !prevBook.isFavorite}));
      } catch (err) {
        setError(err.message || 'Failed to change favorite status');
        console.log(err);
      }
    };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return <p>Book not found</p>;


    return (
        <div className="book-details-page">
            <h2>{book.title}</h2>
            <p>Added by : {book.creator.firstName + ' ' + book.creator.lastName}</p>
            <p>Added on : {new Date(book.createdAt).toLocaleDateString()}</p>

            {editMode ? (
                <Form onSubmit={handleUpdate}>
                    <Input
                        label="Description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button type="submit">Update</Button>
                    <Button onClick={()=> setEditMode(false)} >Cancel</Button>
                </Form>
            ) : (
                <>
                 <p>Description: {book.description}</p>

                    {book.isOwner ? (
                    <>
                        <Button onClick={()=> setEditMode(true)}>Update Description</Button>
                        <Button onClick={handleDelete}>Delete Book</Button>
                    </>
                    ) : (
                        <Button onClick={()=> handleFavoriteClick(book._id)}>
                          {book.isFavorite ? "Remove from favorite" : "Add to favorite"}
                        </Button>
                    )}
                     <h3>Users who like this book :</h3>
                    <ul>
                    {book.favoredBy.map((user) => (
                      <li key={user._id}>
                            {user.firstName} {user.lastName}
                      </li>
                     ))}
                    </ul>
                </>
            )}
          
        </div>
    );
}

export default BookDetails;