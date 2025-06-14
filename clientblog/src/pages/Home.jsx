import React from 'react'
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import BlogCard from '../components/BlogCard';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
        <Navbar />
        <Header/>
        <BlogList />
        <Newsletter />
        <Footer />
    </div>
  )
}

export default Home;