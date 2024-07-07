import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';

const TVShows = () => {
    const [isScrolled, setIsScrolled]=useState(false);

    const navigate=useNavigate();
    const dispatch=useDispatch();
  
    const genresLoaded=useSelector((state)=>state.netflix.genresLoaded);
    const movies=useSelector((state)=>state.netflix.movies) || [];
    const genres=useSelector((state)=>state.netflix.genres);
  
    
    useEffect(()=>{
      dispatch(getGenres());
    },[])
  
    useEffect(()=>{
      if(genresLoaded) dispatch(fetchMovies({type:'tv'}));
    },[genresLoaded])
  
  
    window.onscroll=()=>{
      setIsScrolled(window.pageYOffset===0?false:true);
      return ()=>(window.onscroll=null);
    }
  
  
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled}/>
      </div>
      <div className="data">
        <h1>TV Shows</h1>
      <SelectGenre genres={genres} type="tv"/>
        {movies.length?<Slider movies={movies}/>
        :<NotAvailable/>
        
      }
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

export default TVShows
