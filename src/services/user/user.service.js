import api from "../api";

export const getAll = async () => {
  return await api.get("User");
};

export const getUser = async (id) => {
  return await api.get("/User/" + id);
};

export const editUser = async (id, user) => {
  return await api.put("/User/" + id, user);
};

export const deleteUser = async (id) => {
  return await api.delete("/User/" + id);
};

export const addUser = async (user) => {
  return await api.post("/User/", user);
};

export const userValidate = async (email, password) => {
  return await api.get("/User?email=" + email + "&password=" + password);
};
