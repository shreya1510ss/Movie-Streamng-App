import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchMovies, getGenres, getUsersLikedMovies } from '../store';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';
import CardSlider from '../components/CardSlider';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';

const MyList = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
  
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies) || [];
    const genres = useSelector((state) => state.netflix.genres);
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setEmail(user.email);
                console.log("here again");
                dispatch(getUsersLikedMovies(user.email)).then(() => {
                    setLoading(false);
                });
            } else {
                setLoading(false); // No user is signed in
            }
        });

        return () => unsubscribe();
    }, [firebaseAuth, dispatch]);

    useEffect(() => {
        window.onscroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true);
            return () => (window.onscroll = null);
        }
    }, []);
  
    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <h1>My List</h1>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    movies.length ? <CardSlider title="" data={movies} /> : <NotAvailable />
                )}
            </div>
        </Container>
    )
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
    h1{
      margin-left: 5rem;
      margin-bottom:0.5rem;
    }  
  }
`;

export default MyList;
