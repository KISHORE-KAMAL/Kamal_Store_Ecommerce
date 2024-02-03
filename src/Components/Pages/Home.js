import React from 'react'
import HeroSection from '../HeroSection';
import Services from '../Services';
import Trusted from '../Trusted';
import FeatureProducts from '../FeatureProducts';

function Home() {
  const data = {
    name: "Kamal Store",
  };
  return (
        <>
          <HeroSection myData={data}/>
          <FeatureProducts/>
          <Services/>
          <Trusted/>
        </>  
    )
}

export default Home