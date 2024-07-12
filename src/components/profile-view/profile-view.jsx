import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { useNavigate } from 'react-router-dom';  // Ensure you're using the correct import for navigate
import './profile-view.scss'; // Import the SCSS file

export const ProfileView = ({ user, token, onUpdatedUser, onLoggedOut }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday && user.birthday.split('T')[0]);
    const [favorites, setFavorites] = useState(user.favoriteMovies || []);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const userResponse = await fetch(`https://myflixv1-deebdbd0b5ba.herokuapp.com/users/${user.username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user details.');
                }

                const userData = await userResponse.json();
                setFavorites(userData.favoriteMovies);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user.username, token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`https://myflixv1-deebdbd0b5ba.herokuapp.com/users/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    username,
                    password: password ? password : undefined,
                    email,
                    birthday
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update profile.');
            }
            const data = await response.json();
            onUpdatedUser(data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
        if (confirm) {
            setLoading(true);
            try {
                const response = await fetch(`https://myflixv1-deebdbd0b5ba.herokuapp.com/users/${username}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to delete profile: ${errorText}`);
                }
                if (typeof onLoggedOut === 'function') {
                    onLoggedOut();  // Call onLoggedOut if it's indeed a function
                }
                localStorage.clear(); // Clear all local storage
                sessionStorage.clear(); // Clear all session storage if used
                navigate('/login', { replace: true }); // Navigate to login page
            } catch (error) {
                console.error('Error deleting profile:', error);
                setError(`Error deleting profile: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Container className="profile-container">
            <Form className="profile-form" onSubmit={handleUpdate}>
                <h1>Edit Profile</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="form-group">
                    <Form.Label className="form-label" htmlFor="formUsername">Username:</Form.Label>
                    <Form.Control className="form-control" id="formUsername" type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <Form.Label className="form-label" htmlFor="formPassword">Password:</Form.Label>
                    <Form.Control className="form-control" id="formPassword" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <Form.Label className="form-label" htmlFor="formEmail">Email:</Form.Label>
                    <Form.Control className="form-control" id="formEmail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <Form.Label className="form-label" htmlFor="formBirthday">Birthday:</Form.Label>
                    <Form.Control className="form-control" id="formBirthday" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                </div>
                <div className="d-flex justify-content-center gap-5">
                    <Button className="btn-primary" type="submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disabled={loading} className="btn-primary">
                        Delete Account
                    </Button>
                </div>
            </Form>

            <h2>Favorite Movies</h2>
            {loading ? <p>Loading...</p> : (
                <Container className="favorite-movies">
                    {favorites.length > 0 ? favorites.map(movie => (
                        <Card key={movie._id} className="mb-3 card">
                            <MovieCard movie={movie} user={user} token={token} />
                        </Card>
                    )) : <p>No favorite movies added.</p>}
                </Container>
            )}
        </Container>
    );
};
