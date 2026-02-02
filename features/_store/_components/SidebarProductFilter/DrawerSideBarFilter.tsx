import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SidebarProductFilter from ".";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/entities/category/types/category.type";

type DrawerSideBarFilterProps = {
  className?: string;
  categories: CategoryType[];
};
export default function DrawerSideBarFilter({
  className,
  categories,
}: DrawerSideBarFilterProps) {
  return (
    <Drawer direction="left" autoFocus>
      <DrawerTrigger asChild>
        <Button
          title="Filter Products"
          className={cn("bg-baraka-lightgreen-200", className)}
        >
          <FilterIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Shop Product By</DrawerTitle>
        </DrawerHeader>
        <VisuallyHidden>
          <DrawerDescription />
        </VisuallyHidden>

        <section className="max-h-dvh overflow-y-auto px-5">
          <SidebarProductFilter categories={categories} />
        </section>
      </DrawerContent>
    </Drawer>
  );
}
