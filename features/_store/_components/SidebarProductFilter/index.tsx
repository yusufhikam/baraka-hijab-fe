import { Accordion } from "@/components/ui/accordion";
import CategoryFilter from "./CategoryFilter";
import { CategoryType } from "@/entities/category/types/category.type";
import PriceFilter from "./PriceFilter";

type SidebarProductFilterProps = {
  categories: CategoryType[];
};

const ACCORDION_ITEMS = { category: "category-filter", price: "price-filter" };

export default function SidebarProductFilter({
  categories,
}: SidebarProductFilterProps) {
  return (
    <aside className="font-geist w-full">
      <section className="">
        <div className="mb-2 border-b pb-1">
          <Accordion
            type="multiple"
            defaultValue={[ACCORDION_ITEMS.category, ACCORDION_ITEMS.price]}
            orientation="horizontal"
          >
            <CategoryFilter
              categories={categories}
              value={ACCORDION_ITEMS.category}
            />
            <PriceFilter value={ACCORDION_ITEMS.price} />
          </Accordion>
        </div>
      </section>
    </aside>
  );
}
