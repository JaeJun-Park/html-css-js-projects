class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }
    login() {
        console.log(`${this.username} logined`);
    }

    logout() {
        console.log(`${this.username} logouted`);
    }
}