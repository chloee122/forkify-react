import { SimpleRecipe, Bookmark } from "../../common/internal";

interface ListItemProps {
  item: SimpleRecipe | Bookmark;
  onClick?: () => void;
}

export default function ListItem({
  item: { imageUrl, title, publisher },
  onClick
}: ListItemProps) {
  return (
    <div onClick={onClick} className="group/item hover:bg-slate-100 flex">
      <img src={imageUrl} alt={title} className="h-10 w-10 rounded-full "></img>
      <div>
        <p className="font-sans text-sm font-semibold text-amber-600">
          {title}
        </p>
        <p className="text-xs text-stone-400">{publisher}</p>
      </div>
    </div>
  );
}
