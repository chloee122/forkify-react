import { useState } from "react";

function RecipeSearch({ onSubmit }) {
  const [term, setTerm] = useState("");
  const handleChange = (event) => {
    setTerm(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(term);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input className="border-2" value={term} onChange={handleChange} />
      <button className="rounded-full bg-amber-500 text-white px-7 py-1">
        Search
      </button>
    </form>
  );
}

export default RecipeSearch;
