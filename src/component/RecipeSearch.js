import { useState } from "react";

function RecipeSearch({ handleSearch, handleChooseRecipe }) {
  const [term, setTerm] = useState("");

  const handleChange = (event) => {
    setTerm(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(term);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="border-2" value={term} onChange={handleChange} />
        <button className="rounded-full bg-amber-500 text-white px-7 py-1">
          Search
        </button>
      </form>
    </div>
  );
}

export default RecipeSearch;
