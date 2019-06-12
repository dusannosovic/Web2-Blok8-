export class Korisnik {
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Username: string;
    Firstname: string;
    Secondname: string;
    Address: string;
    DateOfBirth: Date;
    UserType: string;
    ImgUrl: string;
    IsVerified: boolean;
    OldUsername: string;

    constructor(username?: string, firstName?: string, secondName?: string, email?: string, 
                password?: string, confirmPassword?: string, address?: string, dob?: Date, userType?: string, valid?: boolean,imgUrl?: string) {

        this.Username = username;
        this.Firstname = firstName;
        this.Secondname = secondName;
        this.Email = email;
        this.Password = password;
        this.ConfirmPassword = confirmPassword;
        this.Address = address;
        this.DateOfBirth = dob;
        this.UserType = userType;
        this.ImgUrl = imgUrl;
        this.IsVerified = valid;
        this.OldUsername = username;
    }
}