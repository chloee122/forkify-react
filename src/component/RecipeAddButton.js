import { useState } from 'react';
import RecipeFormModal from './RecipeFormModal';

function RecipeAddButton() {
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const handleClick = () => {
    setShowRecipeModal(true);
    document.body.classList.add('overflow-hidden');
  };
  const handleClose = () => {
    setShowRecipeModal(false);
    document.body.classList.remove('overflow-hidden');
  };
  return (
    <div className='relative'>
      <button onClick={handleClick}>ADD RECIPE</button>
      {showRecipeModal && <RecipeFormModal onClose={handleClose} />}
    </div>
  );
}

export default RecipeAddButton;
