// To Create and Store the User Data 


export class User {
    constructor( 
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date 
    ) {}

    // To Access the TOKEN
    get token() {
        // Check the Validity of the TOKEN
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }else {
            return this._token;
        }
    }
}