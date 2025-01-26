import { Losses } from "@/lib/types";

type TableFiltersProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  losses: Losses[];
};

const TableFilters: React.FC<TableFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  losses,
}) => {
  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Categories</option>
        {losses.map(({ category }) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableFilters;
