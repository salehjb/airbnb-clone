import categories from "@/data/categories";
import { usePathname, useSearchParams } from "next/navigation";
import CategoryBox from "./CategoryBox";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <div className="container">
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            category={item}
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
