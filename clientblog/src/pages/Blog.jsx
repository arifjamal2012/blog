import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
  const {id} = useParams();
  // console.log(id, "helo");

  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState(" ");
  const [content, setContent] = useState(" ");

  const fetchBlog = async () => {
    // const data = blog_data.find((item) => item._id === id);
    // setData(data)
    // console.log(data, "dd")
    try {
      const { data } = await axios.get(`api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }

  }

  const fetchCommnets = async () => {
    // setComments(comments_data)
    try {
      const { data } = await axios.post('/api/blog/comments', {blogId: id})
      if(data.success){
        setComments(data.comments);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', {blog: id, name, content});
      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlog();
    fetchCommnets();
  },[]);

  console.log(comments)


  return data ? (
    <>
      <Navbar/>
      <div className='relative'>
        <img src={assets.gradientBackground} alt="bkg" className='absolute -top-50 -z-1 opacity-50' />
        <div className='text-center mt-20 text-gray-600'>
          <p className='text-primary py-4 font-medium '>Published on {moment(data.createdAt).format("MMMM Do YYYY")}</p>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
          <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
          <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Michel Brown</p>
        </div>
        <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
          <div className='flex justify-center'>
            <img width={400} src={data.image} alt="blog" className='rounded-3xl mb-5' />
          </div>
          <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ "__html": data.description}}></div>

          {/* Comment Section */}
          <div className='mt-14 mb-10 max-w-3xl mx-auto'>
            <p className='font-semibold pb-4'>Comments ({comments.length})</p>
            <div className='flex flex-col gap-4'>
              {comments.map((item,index) => {

                return(
                <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                  <div className='flex items-center gap-2 mb-2'>
                    <img className='w-6' src={assets.user_icon} alt="user" />
                    <p className='font-medium'>{item.name}</p>
                  </div>
                  <p className='text-sm max-w-md ml-8'>{item.content}</p>
                  <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                    {moment(item.createdAt).fromNow()}
                    </div>
                </div>
                )
              })}
            </div>
          </div>

        {/* Add Comment Section */}
          <div className='max-w-3xl mx-auto'>
              <p className='font-semibold mb-4 '>Add Your Comment</p>
              <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none' />

                <textarea onChange={(e) => setContent(e.target.value)} value={content} required placeholder='Comment' className='w-full p-2 border border-gray-300 rounded outline-none h-48'></textarea>

                <button type="submit" className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
              </form>
          </div>

          {/* Share Buttons */}
          <div className='my-24 max-w-3xl mx-auto'>
              <p className='font-semibold my-4'>Share this article on social media</p>
              <div className='flex'>
                <img src={assets.facebook_icon} width={50} alt="" />
                <img src={assets.twitter_icon} width={50} alt="" />
                <img src={assets.googleplus_icon} width={50} alt="" />
              </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  ): (
    <Loader />
  )
}

export default Blog;