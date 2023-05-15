import dbTest from '../../public/db/db.json';

export function getUsers() {
  return dbTest.users;
}

export function authenticateUser(email: string, password: string) {
  const users = getUsers();
  const user = users.find((userData) => userData.email === email && userData.password === password);
  return user != null;
}
