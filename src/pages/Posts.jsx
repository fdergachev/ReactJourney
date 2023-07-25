import React, { useEffect, useMemo, useState } from "react";
import "../styles/App.css"
import PostList from "../components/postlist";

import PostForm from "../components/postform";

import PostFilter from "../components/postfilter";
import MyModal from "../components/UI/modal/mymodal";
import MyButton from "../components/UI/button/mybutton";
import { usePosts } from "../hooks/useposts";
import axios from "axios";
import PostService from "../API/postservice";
import Loader from "../components/UI/loader/loader";
import { useFetching } from "../hooks/usefetching";

import getPagesCount from "../utils/pages.js";
import Pagination from "../components/UI/pagination/pagination";

function Posts() {

   const [posts, setPosts] = useState([]);
   const [filter, setFilter] = useState({ sort: '', query: '' });
   const [modal, setModal] = useState(false);
   const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
   const [totalPages, setTotalPages] = useState(0)
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(1)





   const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPagesCount(totalCount, limit))
   })
   useEffect(() => {
      fetchPosts()
   }, []);

   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }

   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   useEffect(() => {
      fetchPosts()
   }, [page])

   const changePage = (page) => {
      setPage(page)
   }

   return (
      <div className="App" >
         <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>Создать пользователя</MyButton>
         <MyModal visible={modal} setVisible={setModal}> <PostForm create={createPost} /> </MyModal>

         <hr style={{ margin: "15px 0" }} />
         <PostFilter filter={filter} setFilter={setFilter} />
         {postError &&
            <h1>Произошла ошибка ${postError}</h1>
         }
         {isPostsLoading
            ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50 }}> <Loader /></div>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
         }
         <Pagination page={page} changePage={changePage} totalPages={totalPages} />
      </div >
   );


}

export default Posts;
