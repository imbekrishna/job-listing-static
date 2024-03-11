import { ReactNode, forwardRef } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

export type Ref = HTMLDivElement;

const SearchBar = forwardRef<Ref, Props>(function SearchBar(_, ref) {
  const [params, setParams] = useSearchParams();
  const tags = params.get("tag")?.split(",");

  return (
    <div
      ref={ref}
      className="absolute top-0 mx-auto flex w-[calc(100%_-_2.5rem)] -translate-y-1/2 items-center rounded-md bg-white px-6 py-4 shadow-custom lg:max-w-screen-lg"
    >
      <div className="flex flex-1 flex-wrap gap-3">
        {tags &&
          tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
      </div>
      <span
        className="cursor-pointer font-bold text-primary hover:underline"
        onClick={() =>
          setParams((prev) => {
            prev.delete("tag");
            return prev;
          })
        }
      >
        Clear
      </span>
    </div>
  );
});
export default SearchBar;
