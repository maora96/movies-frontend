export interface SignIn {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  name: string;
  password: string;
}

export interface MovieFilters {
  title?: string;
  director?: string;
  actors?: string[];
  genres?: string[];
}

export interface CreateMovie {
  title: string;
  summary: string;
  coverUrl: string;
  director: string;
  genres: string[];
  actors: string[];
}

export interface VoteInBook {
  id: string;
  rating: number;
}

export interface UpdateUser {
  email?: string;
  name?: string;
}
