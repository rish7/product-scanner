

/**
 * User object 
 * @export
 * @class User
 */
export class User {
    id: string;
    private _fullName: string;
    public get fullName(): string {
        return this._fullName;
    }
    firstname: string;
    lastname: string;
    email:string;
    displayLetters:string;

    constructor(response: any) {
        this.id = response.userID
        this.email = response.user.email;
        this.firstname = response.user.firstname;
        this.lastname = response.user.lastname;
        this._fullName=`${this.firstname} ${this.lastname}`;
        this.displayLetters = ((this.lastname || "  ").substring(0,1)  +  (this.lastname || "  ").substring(0,1) ) .toUpperCase();

      }
      
}
