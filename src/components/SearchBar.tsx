import { ReactNode, forwardRef } from "react";

interface Props {
  children?: ReactNode;
  tags?: string[] | undefined;
}

export type Ref = HTMLDivElement;

const SearchBar = forwardRef<Ref, Props>(function SearchBar(props, ref) {
  return (
    <div
      ref={ref}
      className="shadow-custom absolute top-0 mx-auto flex w-[calc(100%_-_2.5rem)] -translate-y-1/2 items-center rounded-md bg-white px-6 py-4 lg:max-w-screen-lg"
    >
      <div className="flex flex-1 flex-wrap gap-3">
        {props.tags &&
          props.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
      </div>
      <span className="cursor-pointer font-bold text-primary hover:underline">
        Clear
      </span>
    </div>
  );
});
export default SearchBar;
