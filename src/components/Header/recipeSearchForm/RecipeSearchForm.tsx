import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

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
    <form
      onSubmit={handleSubmit}
      className="flex justify-end rounded-full h-14 w-[75%] bg-white"
    >
      <input
        value={term}
        onChange={handleChange}
        placeholder="Search over 1,000,000 recipes..."
        className="w-3/5 outline-none"
      />
      <button className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-br from-background1 to-background2 text-white px-7 py-1 w-2/6">
        <FiSearch className="text-xl" /> SEARCH
      </button>
    </form>
  );
}

export default RecipeSearchForm;
