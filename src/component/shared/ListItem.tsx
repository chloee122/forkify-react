import { SimpleRecipe, Bookmark } from "../../common/internal";

interface ListItemProps {
  item: SimpleRecipe | Bookmark;
  onClick?: () => void;
}

export default function ListItem({
  item: { imageUrl, title, publisher },
  onClick,
}: ListItemProps) {
  return (
    <div
      onClick={onClick}
      className="hover:-translate-y-0.5 hover:bg-secondary flex justify-start gap-3 items-center px-8 py-4"
    >
      <img
        src={imageUrl}
        alt={title}
        className="h-16 w-16 rounded-full object-cover"
      ></img>
      <div>
        <p className="text-sm font-semibold text-primary uppercase font-semibold text-ellipsis max-w-[15rem] overflow-hidden whitespace-nowrap">
          {title}
        </p>
        <p className="text-xs text-greydark2 uppercase font-semibold">
          {publisher}
        </p>
      </div>
    </div>
  );
}
