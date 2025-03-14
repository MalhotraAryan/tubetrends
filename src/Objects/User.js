const DEFAULTS = {
    FirstName: "",
    LastName: "",
    PhoneNumber: ""
}
class User {

    constructor(data) {
        this.UserName = data.UserName;
        this.Password = data.Password;
        this.Email = data.Email;
        this.FirstName = data.FirstName || DEFAULTS.FirstName;
        this.LastName = data.LastName || DEFAULTS.LastName;
        this.PhoneNumber = data.PhoneNumber || DEFAULTS.PhoneNumber;
    }

    // Getters
    getUserName() {
        return this.UserName;
    }
    getPassword() {
        return this.Password;
    }
    getEmail() {
        return this.Email;
    }
    getFirstName() {
        return this.FirstName;
    }
    getLastName() {
        return this.LastName;
    }
    getPhoneNumber() {
        return this.PhoneNumber;
    }
    // Setters
    setUserName(UserName) {
        this.UserName = UserName;
    }
    setPassword(Password) {
        this.Password = Password;
    }
    setEmail(Email) {
        this.Email = Email;
    }
    setFirstName(FirstName) {
        this.FirstName = FirstName;
    }
    setLastName(LastName) {
        this.LastName = LastName;
    }


}
export default User;