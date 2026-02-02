import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CategoryType } from "@/entities/category/types/category.type";
import CategoryFilterItem from "./CategoryFilterItem";

type CategoryFilterProps = {
  categories: CategoryType[];
  value: string;
};
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  value,
}) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>Category</AccordionTrigger>

      <AccordionContent>
        <div className="space-y-2 px-1.5">
          {categories.map((ctg) => (
            <CategoryFilterItem category={ctg} key={ctg.slug} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoryFilter;
