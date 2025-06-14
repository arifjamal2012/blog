import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets';
import { motion } from 'motion/react';
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
	const [menu, setMenu] = useState("All");
	const { blogs, input} = useAppContext();

	const filteredBlogs = () => {
		if(input === ""){
			return blogs
		}
		return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
	}
	return (
		<>
			<div className='flex justify-center gap-4 sm:gap-9 my-10 border border-primary py-2 max-w-[560px] h-10 m-auto rounded-full relative'>
				{blogCategories.map((item) => {
					return (
						<div key={item} className='relative leading-none'>
							<button className={`cursor-pointer text-sm px-4 text-gray-500 ${menu === item && 'text-white pt-0.5'}`} onClick={() => setMenu(item)}>{item}
								{menu === item && <motion.div
									layoutId="underline"
									transition={{ type: 'spring', stiffness: 500, damping: 40 }}
									className='absolute left-0 right-0 top-0 h-6 -z-1 bg-primary rounded-full '></motion.div>}
							</button>
						</div>
					)
				})}
			</div>
		<div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 pb-6 mx-8 sm:mx-16 xl:mx-40 min-h-[470px]'>
				{filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).map((data) => {
					return(
						<BlogCard key={data._id} blog={data} />
					)
				})}
			</div>
		</div>
		</>
	)
}

export default BlogList