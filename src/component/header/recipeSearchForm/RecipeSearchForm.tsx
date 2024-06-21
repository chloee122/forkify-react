import React, { useState } from "react";

interface RecipeSearchFormProps {
  handleSearch: (term: string) => void;
}

function RecipeSearchForm({ handleSearch }: RecipeSearchFormProps) {
  const [term, setTerm] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

export default RecipeSearchForm;
