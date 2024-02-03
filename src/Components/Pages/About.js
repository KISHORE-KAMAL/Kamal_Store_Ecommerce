import React from 'react'
import HeroSection from '../HeroSection'
import { useProductContext } from '../../Context/productContext';

function About() {
  const {myName} = useProductContext()
  const data = {
    name: "Kamal Ecommerce",
  };
  return (
    <>
      {myName}
      <HeroSection myData={data}/>
    </>
  )
}

export default About