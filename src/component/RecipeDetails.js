import { GoClock, GoPerson, GoBookmark, GobookmarkFill } from "react-icons/go";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
function RecipeDetails({ cookingTime, servings }) {
  return (
    <div className="uppercase flex items-center pt-24 pb-12 pr-32 pl-32">
      <div className="flex mr-16 items-center">
        <GoClock className="mr-1" />
        <div>{cookingTime} minutes</div>
      </div>
      <div className="flex mr-16 items-center">
        <GoPerson className="mr-1" />
        <div>{servings} servings</div>
        <CiCircleMinus className="ml-2" />
        <CiCirclePlus />
      </div>
      <button className="rounded-full bg-gradient-to-br from-yellow-100 to-orange-500 h-10 w-10 flex items-center justify-center">
        <GoBookmark className="text-white h-6 w-6" />
      </button>
    </div>
  );
}

export default RecipeDetails;
