import style from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import OpenRecipe from './components/OpenRecipe/OpenRecipe';
import SearchRecipe from './components/SearchRecipe/SearchRecpe';
import UserEditProfile from './components/UserEditProfile/UserEditProfile';
import UserCreateRecipe from './components/UserCreateRecipe/UserCreateRecipe';
import UserEditRecipe from './components/UserEditRecipe/UserEditRecipe';
import UserHome from './components/UserHome/UserHome';
import UserSearchRecipe from './components/UserSearchRecipe/UserSearchRecipe';
import UserOpenRecipe from './components/UserOpenRecipe/UserOpenRecipe';
import UserProfile from './components/UserProfile/UserProfile';
import UserPublishedRecipes from './components/UserPublishedRecipes/UserPublishedRecipes';
import UserSavedRecipes from './components/UserSavedRecipes/UserSavedRecipes';
import NotFoundPage from './components/PageNotFound/PageNotFound';
import { useState } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Routes>
        <Route path='/' element={<Home setSearchTerm={setSearchTerm} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/open-recipe' element={<OpenRecipe setSearchTerm={setSearchTerm} />} />
        <Route path='/search-recipe' element={<SearchRecipe searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        <Route path='/user-edit-profile' element={<UserEditProfile />} />
        <Route path='/user-create-recipe' element={<UserCreateRecipe setSearchTerm={setSearchTerm} />} />
        <Route path='/user-edit-recipe' element={<UserEditRecipe setSearchTerm={setSearchTerm} />} />
        <Route path='/user-home' element={<UserHome setSearchTerm={setSearchTerm} />} />
        <Route path='/user-search-recipe' element={<UserSearchRecipe searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        <Route path='/user-open-recipe' element={<UserOpenRecipe setSearchTerm={setSearchTerm} />} />
        <Route path='/user-profile' element={<UserProfile setSearchTerm={setSearchTerm} />} />
        <Route path='/user-published-recipes' element={<UserPublishedRecipes setSearchTerm={setSearchTerm} />} />
        <Route path='/user-saved-recipes' element={<UserSavedRecipes setSearchTerm={setSearchTerm} />} />
        <Route path='/*' element={<NotFoundPage setSearchTerm={setSearchTerm} />} />
      </Routes>
    </>
  );
};

export default App;
