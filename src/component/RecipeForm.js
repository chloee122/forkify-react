function RecipeForm({ onSubmit, onChange, state }) {
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="flex flex-row">
          <div>
            <h3>RECIPE DATA</h3>
            <div className="flex flex-col">
              <label>Title</label>
              <input
                name="title"
                type="text"
                onChange={onChange}
                value={state.title}
                required
              />
              <label>URL</label>
              <input
                name="source_url"
                type="text"
                onChange={onChange}
                value={state.source_url}
                required
              />
              <label>Image URL</label>
              <input
                name="image_url"
                type="text"
                onChange={onChange}
                value={state.image_url}
                required
              />
              <label>Publisher</label>
              <input
                name="publisher"
                type="text"
                onChange={onChange}
                value={state.publisher}
                required
              />
              <label>Prep time</label>
              <input
                name="cooking_time"
                type="number"
                onChange={onChange}
                value={state.cooking_time || ""}
                required
              />
              <label>Servings</label>
              <input
                name="servings"
                type="number"
                onChange={onChange}
                value={state.servings || ""}
                required
              />
            </div>
          </div>

          <div>
            <h3>INGREDIENTS</h3>
            <div className="flex flex-col">
              <label>Ingredient 1</label>
              <input
                id={0}
                type="text"
                placeholder="Format: 'Quantity, Unit, Description'"
                onChange={onChange}
                value={state.ingredients[0]}
              />
              <label>Ingredient 2</label>
              <input
                id={1}
                type="text"
                placeholder="Format: 'Quantity, Unit, Description'"
                onChange={onChange}
                value={state.ingredients[1]}
              />
              <label>Ingredient 3</label>
              <input
                id={2}
                type="text"
                placeholder="Format: 'Quantity, Unit, Description'"
                onChange={onChange}
                value={state.ingredients[2]}
              />
              <label>Ingredient 4</label>
              <input
                id={3}
                type="text"
                placeholder="Format: 'Quantity, Unit, Description'"
                onChange={onChange}
                value={state.ingredients[3]}
              />
              <label>Ingredient 5</label>
              <input
                id={4}
                type="text"
                placeholder="Format: 'Quantity, Unit, Description'"
                onChange={onChange}
                value={state.ingredients[4]}
              />
              <label>Ingredient 6</label>
              <input
                id={5}
                type="text"
                placeholder="Format: 'Quantity, Unit, Description'"
                onChange={onChange}
                value={state.ingredients[5]}
              />
            </div>
          </div>
        </div>

        <button>UPLOAD</button>
      </form>
    </div>
  );
}

export default RecipeForm;
