export default class Users {
    constructor(id, firstname, lastname, othernames, email, phoneNumber, username, isAdmin) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.othernames = othernames;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.registered = new Date().toString();
        this.isAdmin = false;
    }
}
