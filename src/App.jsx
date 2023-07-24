import React, { useEffect, useMemo, useState } from "react";
import "./styles/App.css"
import PostList from "./components/postlist";

import PostForm from "./components/postform";

import PostFilter from "./components/postfilter";
import MyModal from "./components/UI/modal/mymodal";
import MyButton from "./components/UI/button/mybutton";
import { usePosts } from "./hooks/useposts";
import axios from "axios";
import PostService from "./API/postservice";
import Loader from "./components/UI/loader/loader";
import { useFetching } from "./hooks/usefetching";
import { usePagesArray } from "./hooks/usepagination.js";
import getPagesCount from "./utils/pages.js";

function App() {

   const [posts, setPosts] = useState([]);
   const [filter, setFilter] = useState({ sort: '', query: '' });
   const [modal, setModal] = useState(false);
   const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
   const [totalPages, setTotalPages] = useState(0)
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(1)

   let pagesArray = usePagesArray(totalPages);



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
         <div className="page__wrapper">
            {pagesArray.map((p) =>
               <span
                  key={p}
                  onClick={() => setPage(p)}
                  className={page === p ? 'page page__current' : 'page'} >
                  {p}
               </span>
            )}
         </div>
      </div >
   );


}

export default App;
