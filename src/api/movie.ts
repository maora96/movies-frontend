import { api, getToken } from ".";
import { MovieFilters, CreateMovie, VoteInBook } from "../types";

export const getOne = async (id: string) => {
  const { data } = await api.get(`/v1/movie/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

export const getMany = async (request: MovieFilters) => {
  const { data } = await api.post(
    `/v1/movie/list`,
    {
      ...request,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return data;
};

export const create = async (request: CreateMovie) => {
  return api.post(
    "/v1/movie/create",
    {
      ...request,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const vote = async (request: VoteInBook) => {
  return api.post(
    `/v1/movie/${request.id}/vote`,
    {
      rating: request.rating,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};
