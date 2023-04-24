import * as types from "../ActionType/ActionType";
import {
  getAll,
  getUser,
  deleteUser,
  editUser,
  addUser,
} from "../../services/user/user.service";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const deleteUsers = (users) => ({
  type: types.DELETE_USER,
  payload: users,
});

const AddUsers = () => ({
  type: types.ADD_USER,
});

const SingleUsers = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});

const EditUsers = () => ({
  type: types.EDIT_USER,
});

export const loadUsers = () => {
  return function (dispatch) {
    getAll()
      .then((resp) => {
        dispatch(getUsers(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteuser = (id) => {
  return function (dispatch) {
    deleteUser(id)
      .then((resp) => {
        console.log(resp.data);
        dispatch(deleteUsers());
        dispatch(loadUsers());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const singleuser = (id) => {
  return function (dispatch) {
    getUser(id)
      .then((resp) => {
        dispatch(SingleUsers(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const adduser = (user) => {
  return function (dispatch) {
    addUser(user)
      .then((resp) => {
        console.log(resp.data);
        dispatch(AddUsers());
        dispatch(loadUsers());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const edituser = (id, user) => {
  return function (dispatch) {
    editUser(id, user)
      .then((resp) => {
        console.log(resp.data);
        dispatch(EditUsers());
        dispatch(loadUsers());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
