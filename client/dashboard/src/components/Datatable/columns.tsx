import { Column, ColumnDef } from "@tanstack/react-table"
import { Button } from "../Elements/Button"
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid"
import { FullPlayerRecord, SeasonAverages } from "@/types"

export interface PlayerAvgData extends Omit<FullPlayerRecord, 'id' | 'team' | 'first_name' | 'last_name'>, Omit<SeasonAverages, 'player_id'> {
  teamname: string,
  fullname: string
}

const columnTitle: Record<string, string> = {
  teamname: "team",
  games_played: "played"
};

const SortingButton = ({ handleClick, title }: { handleClick: () => void, title: string }) => <Button
  variant="outline"
  size="xs"
  onClick={handleClick}
>
  <div className="flex items-center gap-1">
    <p>
      {columnTitle[title] ?? title}
    </p>
    <ArrowsUpDownIcon className="h-4 w-4" />
  </div>
</Button>

const accessorKeys = [
  "teamname",
  "ast",
  "blk",
  "dreb",
  "fg3_pct",
  "fg3a",
  "fg3m",
  "fg_pct",
  "fga",
  "fgm",
  "ft_pct",
  "fta",
  "ftm",
  "games_played",
  "min",
  "oreb",
  "pf",
  "pts",
  "reb",
  "stl",
  "turnover"
]

const sortableColumns = accessorKeys.map((key) => {
  return {
    accessorKey: key,
    header: ({ column }: { column: Column<PlayerAvgData, unknown> }) => {
      return (
        <SortingButton title={key} handleClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />
      )
    },
  }
})

export const columns: ColumnDef<PlayerAvgData>[] = [
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <SortingButton title="name" handleClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />
      )
    },
  },
  {
    accessorKey: "position",
    header: "pos."
  },
  {
    accessorKey: "height",
    header: "ht"
  },
  {
    accessorKey: "weight",
    header: "wt"
  },
  ...sortableColumns
]
