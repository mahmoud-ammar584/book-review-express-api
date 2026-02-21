class UserService {
  constructor() {
    this.users = [];
  }

  registerUser(username, password) {
    if (this.userExists(username)) {
      return { success: false, message: 'Username already registered' };
    }

    this.users.push({
      username,
      password,
      createdAt: new Date(),
    });

    return { success: true, message: 'User successfully registered' };
  }

  authenticateUser(username, password) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    return !!user;
  }

  userExists(username) {
    return this.users.some((u) => u.username === username);
  }

  getUserByUsername(username) {
    return this.users.find((u) => u.username === username);
  }
}

module.exports = new UserService();
