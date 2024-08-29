import { Store } from "../../types/Store";

export type SortOption = "name_asc" | "name_desc" | "date_asc" | "date_desc";

export const sortStores = (
  stores: Store[],
  sortOption: SortOption
): Store[] => {
  return [...stores].sort((a, b) => {
    const [field, direction] = sortOption.split("_");
    const multiplier = direction === "asc" ? 1 : -1;

    switch (field) {
      case "name":
        return multiplier * a.name.localeCompare(b.name);
      case "date":
        return (
          multiplier *
          (new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        );
      default:
        return 0;
    }
  });
};

export const paginateStores = (
  stores: Store[],
  currentPage: number,
  itemsPerPage: number
): Store[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return stores.slice(startIndex, startIndex + itemsPerPage);
};

export const calculatePageCount = (
  stores: Store[],
  itemsPerPage: number
): number => {
  return Math.ceil(stores.length / itemsPerPage);
};
