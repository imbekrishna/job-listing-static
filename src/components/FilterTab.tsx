import { ReactNode, forwardRef } from "react";
import { useSearchParams } from "react-router-dom";
import removeIcon from "../assets/images/icon-remove.svg";

interface Props {
  children?: ReactNode;
  hidden: boolean;
}

export type Ref = HTMLDivElement;

const SearchBar = forwardRef<Ref, Props>(function SearchBar(props, ref) {
  const [params, setParams] = useSearchParams();
  const tags = params.get("tag")?.split(",");

  const removeFilter = (tag: string) => {
    const removed = tags?.filter((i) => i !== tag).join(",");
    setParams((prevParam) => {
      if (!removed) {
        prevParam.delete("tag");
      } else {
        prevParam.set("tag", removed);
      }
      return prevParam;
    });
  };

  return (
    <div
      ref={ref}
      className={`${props.hidden ? "invisible" : "visible"} absolute top-0 mx-auto flex w-[calc(100%_-_2.5rem)] -translate-y-1/2 items-center rounded-md bg-white px-6 py-4 shadow-custom lg:max-w-screen-lg`}
    >
      <div className="flex flex-1 flex-wrap gap-3">
        {tags &&
          tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center justify-center overflow-clip rounded-md"
            >
              <span
                key={tag}
                className="bg-background p-2 font-bold text-primary"
              >
                {tag}
              </span>
              <div
                className="flex cursor-pointer items-center justify-center self-stretch bg-black px-3"
                onClick={() => removeFilter(tag)}
              >
                <img src={removeIcon} alt="" />
              </div>
            </div>
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
