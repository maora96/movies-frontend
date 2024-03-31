import { api, getToken } from ".";
import { UpdateUser } from "../types";

export const edit = async (request: UpdateUser, id: string) => {
  return api.patch(
    `/v1/user/${id}`,
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

export const deleteOne = async (id: string) => {
  const { data } = await api.delete(`/v1/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data.result;
};
