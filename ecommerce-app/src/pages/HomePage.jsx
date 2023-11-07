import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Header/Hero'
import Categories from '../components/Category/Categories'
const Home = () => {
  return (
    <>
        <Header navActive={1}/>
        <Hero />
        <Categories />
        <h3 className='text-red-500'>aaa</h3>
    </>
    
  )
}

export default Home