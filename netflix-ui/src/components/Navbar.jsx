import React, { useState } from 'react'
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { FaPowerOff, FaSearch} from 'react-icons/fa';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { Link, useNavigate } from "react-router-dom";


const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
          cursor:pointer;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      display: flex;
      align-items: center;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
      .dropdown {
        position: relative;
        .dropdown-button {
          background: none;
          border: none;
          cursor: pointer;
          color: white;
          font-size: 1rem;
          &:focus {
            outline: none;
          }

          img{
          height:40px;
          border-radius:5px;
          }
        }
        .dropdown-menu {
          display: flex;
          flex-direction: column;
          position: absolute;
          right: 0;
          top: 100%;
          background-color: black;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          z-index: 1;
          min-width: 120px;
          padding: 0.5rem 0;
          button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem 1rem;
            text-align: left;
            width: 100%;
            color: white;
            &:hover {
              background-color: #333;
            }
          }
        }
      }
    }
  }
`;



const Navbar = ({isScrolled}) => {

    const [showSearch, setShowSearch]=useState(false);
    const [inputHover, setInputHover]=useState(false);

    const links=[
        // {name:'Home',link:"/"},
        {name:'TV Shows',link:"/tv"},
        {name:'Movies',link:"/movies"},
        {name:'My List',link:"/mylist"},
    ]


    const navigate = useNavigate();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
      })
    


      const [open, setOpen] = useState(false);

    const handleSignOut = () => {
      signOut(firebaseAuth);
       
    };

    const handleSettings = () => {

      navigate("/setting")
      
    };
  return (
    <Container>
        <nav className={`flex ${isScrolled?"scrolled":""}`}>
            <div className="left flex a-center">
                <div className="brand flex a-center j-center">
                    <img src={logo} alt='logo' onClick={()=>{navigate("/")}}/>
                </div>
                <ul className="links flex">
                    {
                        links.map(({name, link})=>{
                            return(
                                <li key={name}><Link to={link}>{name}</Link></li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className="right flex a-center">
                {/* <div className={`search ${showSearch? "show-search":""}`}>
                    <button onFocus={()=>setShowSearch(true)}
                   
                        >
                        <FaSearch/>
                    </button>
                    <input type='text' placeholder='Search'
                    onMouseEnter={()=>setInputHover(true)}
                    onMouseLeave={()=> setInputHover(false)}
                    onBlur={()=>{
                         setShowSearch(false);
                         setInputHover(false);
                    }}
                    />
                </div> */}
                <div className="dropdown">
            <button onClick={() => setOpen(!open)} className="dropdown-button">
            <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg" alt="profile" />

            </button>
            {open && (
                <div className="dropdown-menu" style={{ color: 'white' }}>
                     <div>
                     <button onClick={handleSettings}>Settings</button>
                     </div>
                     
                     <div>
                     <button onClick={handleSignOut}>Logout</button></div>
                  
                </div>
            )}
        </div>
                

            </div>
        </nav>

      
    </Container>
  )
}

export default Navbar
