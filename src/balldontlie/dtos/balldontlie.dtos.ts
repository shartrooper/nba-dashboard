export class Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export class Player {
  id: number;
  first_name: string;
  height_feet: number;
  height_inches: number;
  last_name: string;
  position: string;
  team: Team;
  weight_pounds: number;
}

export class PayloadMetadata {
  total_pages: number;
  current_page: number;
  next_page: null | number;
  per_page: number;
  total_count: number;
}

export class GetManyPayload<D extends Team | Player> {
  data: D[];
  meta: PayloadMetadata;
}
