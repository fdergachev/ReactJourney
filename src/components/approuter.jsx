import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { privatRoutes, publicRoutes } from '../router/routes.js'
import { AuthContext } from '../context/index.js';
import Loader from './UI/loader/loader.jsx';

const AppRouter = () => {

   const { isAuth, setIsAuth, isLoading } = useContext(AuthContext);
   if (isLoading) {
      return <Loader />
   }
   return (
      isAuth
         ? <Routes>
            {privatRoutes.map(route =>
               <Route path={route.path} element={route.component} exact={route.exact} key={route.path} />
            )}
            <Route path="*" element={<Navigate to="/posts" replace />} />
         </Routes>
         : <Routes>
            {publicRoutes.map(route =>
               <Route path={route.path} element={route.component} exact={route.exact} key={route.path} />
            )}
            <Route path="*" element={<Navigate to="/login" replace />} />
         </Routes>




   );
};

export default AppRouter;