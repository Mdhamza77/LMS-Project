export const emailValidator = (email) => {
  const emailRegex = /^[a-z0-9._:$!%-]+@[a-z0-9.-]+.[a-zA-Z]$/;
  return emailRegex.test(email);
};

export const passwordValidator = (password) => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@!?$%^&*-]).{8,}$/;
  return passwordRegex.test(password);
};

export const textArea = (text) => {
  const textRegex = /^\s*(?:\S\s*){10,400}$/;
  return textRegex.test(text);
};

export const BookName = (name) => {
  const bookName =  /^[a-zA-Z]+( [a-zA-Z]+)+$/;
  return bookName.test(name);
};

export const AuthorName = (name) => {
  const authorName = /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/;
  return authorName.test(name);
};
