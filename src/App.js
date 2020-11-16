import React, {useEffect, useState} from 'react';
import Recipe from './recipe';
import './App.css';

const App = () => {
  const App_ID = "b6cc4351";
  const App_Key = "7d623a5962622003b16dc53bb84e712a";
 
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch]= useState('');
  const [query, setQuery] = useState('pounded yam');

  useEffect(() => {
   getRecipes(); 
  }, [query]); 

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_Key}`);
    
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data.hits);
  };
  
  const getSearch = e => {
    e.preventDefault(); 
    setQuery(search);
    setSearch(""); 
  };

  const updateSearch = e => {
    setSearch(e.target.value);   
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search_form">
        <input className="search_bar" type="text" value={search} onChange={updateSearch} />
        <button className="search_button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image} 
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div> 
  )
}

export default App;
