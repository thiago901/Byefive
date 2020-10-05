export default (user: any): any => {
  const nUser = user.toObject();
  delete nUser.password;
  return nUser;
};
