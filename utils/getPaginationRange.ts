type GetPaginationProps = {
  delta: number;
  currentPage: number;
  lastPage: number;
};

export default function getPaginationRange({
  currentPage,
  lastPage,
  delta,
}: GetPaginationProps) {
  const range: (number | "ellipsis")[] = [];

  const start = Math.max(2, currentPage - delta);
  const end = Math.min(lastPage - 1, currentPage + delta);

  range.push(1);

  if (start > 2) range.push("ellipsis");

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < lastPage - 1) range.push("ellipsis");

  if (lastPage > 1) range.push(lastPage);

  return range;
}
