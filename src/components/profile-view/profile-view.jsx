import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { useNavigate } from 'react-router-dom';
import './profile-view.scss';
import { useMovieContext } from '../../context/MovieContext';

export const ProfileView = ({ user, token, onUpdatedUser, onLoggedOut }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : '');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { favoriteMovies, setFavoriteMovies } = useMovieContext();

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
                setFavoriteMovies(userData.favoriteMovies);

                if (userData.birthday) {
                    const parsedBirthday = new Date(userData.birthday).toISOString().split('T')[0];
                    setBirthday(parsedBirthday);
                }

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user.username, token, setFavoriteMovies]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`https://myflixv1-deebdbd0b5ba.herokuapp.com/users/${user.username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    username,
                    password: password || undefined,
                    email,
                    birthday
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update profile. Status Code: ' + response.status);
            }

            alert('Profile updated successfully! Please log in again with your new username.');

            localStorage.clear();
            sessionStorage.clear();
            onLoggedOut();  // Clear user and token in parent component
            navigate('/login', { replace: true });

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

                localStorage.clear();
                sessionStorage.clear();

                // After deleting the account, log out the user
                onLoggedOut(); // Clear user and token in parent component
                navigate('/login', { replace: true });

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
                    {favoriteMovies.length > 0 ? favoriteMovies.map(movie => (
                        <Card key={movie._id} className="mb-3 card">
                            <MovieCard movie={movie} user={user} token={token} />
                        </Card>
                    )) : <p>No favorite movies added.</p>}
                </Container>
            )}
        </Container>
    );
};
