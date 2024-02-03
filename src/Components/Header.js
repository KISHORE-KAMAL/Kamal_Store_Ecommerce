import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import logoImage from "../Images/logo.png"
import Navbar from './Navbar';

const Header = () => {
  return (
    <MainHeader>
        <NavLink to="/">
            <img src={logoImage} alt="logo" />
        </NavLink>
        <Navbar/>
    </MainHeader>
  )
}

const MainHeader = styled.header`
    padding: 0 4.8rem;
    height: 10rem;
    background-color: ${({theme})=>theme.colors.bg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .logo{
        height: 5rem;
    }
`;

export default Header