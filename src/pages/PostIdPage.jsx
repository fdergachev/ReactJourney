import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/usefetching.js'
import PostService from '../API/postservice.js'
import Loader from '../components/UI/loader/loader.jsx';


const PostIdPage = () => {
   const params = useParams();
   const [post, setPost] = useState({})
   const [comments, setComments] = useState([])
   const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
      const response = await PostService.getById(id)
      setPost(response.data)
   });
   const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
      const response = await PostService.getCommentsByPostId(id)
      setComments(response.data)
   });


   useEffect(() => {
      fetchPostsById(params.id);
      fetchComments(params.id);
   }, [])

   return (
      <div>
         <h1>Вы открыли страницу поста с ID - {params.id}</h1>
         {isLoading
            ? <Loader />
            : <div className="">{post.id}. {post.title}</div>
         }
         <h1>Комментарии</h1>
         {isComLoading
            ? <Loader />
            : <div className="">
               {comments.map(comm =>
                  <div style={{ marginTop: 15 }}>
                     <h5>{comm.email}</h5>
                     <div className="">{comm.body}</div>
                  </div>
               )}
            </div>
         }
      </div>
   );
};

export default PostIdPage; 