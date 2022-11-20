import { Link } from "react-router-dom";
import { CategoryData } from "../create/category_data";
export const Category = () => {
  const category = CategoryData;
  return (
    <div className="relative top-[60px] flex w-full flex-col items-center justify-center py-12">
      <h1 className="mt-6 text-3xl text-white">Kategóriák</h1>
      <div className="justify-items-around mt-16 grid w-full grid-cols-2 content-center items-center justify-center gap-4 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {category.map((category, index) => {
          return (
            <Link
              key={index}
              className="flex h-[128px] w-full cursor-pointer items-center justify-center rounded-xl border-2 border-green-500 bg-white/10 text-center text-xl text-white duration-200 ease-in-out hover:bg-white/20"
              to={`/category/${category.value}`}
            >
              {category.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
