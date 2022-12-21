import { Dropdown } from "flowbite-react";
import { FC, useCallback, useMemo, useRef } from "react";
import { Category } from "../../../types";

interface SearchProps {
  categories: Category[];
  onChangeCategory: (category: Category) => void;
  onChangeInput: (value: string) => void;
  selectedCategory?: Category | null;
}

const SearchIcon = () => (
  <>
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
    <span className="sr-only">Search</span>
  </>
);

export const Search: FC<SearchProps> = ({
  categories,
  selectedCategory,
  onChangeInput,
  onChangeCategory,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSearch = useCallback(() => {
    const value = inputRef?.current?.value;
    onChangeInput(value || "");
  }, [onChangeInput]);

  const dropdownList = useMemo(
    () =>
      categories.map((category) => (
        <Dropdown.Item
          key={category.id}
          onClick={() => {
            onChangeCategory(category);
          }}
        >
          {category.name}
        </Dropdown.Item>
      )),
    [categories, onChangeCategory]
  );

  const dropdownStyle = {
    borderEndEndRadius: 0,
    borderStartEndRadius: 0,
    height: 42,
    backgroundColor: "#343D48",
  };

  return (
    <div className="flex">
      <Dropdown
        label={selectedCategory?.name || "All"}
        size="md"
        style={dropdownStyle}
       
      >
        {dropdownList}
      </Dropdown>
      <div className="relative w-full">
        <input
          type="search"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300  dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="Search by blog post title..."
          ref={inputRef}
          required
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white rounded-r-lg"
          style={{backgroundColor: "#343D48"}}
          onClick={onSearch}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};
