export enum USER_ROLES {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export class User{
    constructor(
        private id: string,
        private email: string,
        private name: string,
        private password: string,
        private role: USER_ROLES
    ){}

    getId(){
        return this.id
    }
    getName(){
        return this.name
    }
    getEmail(){
        return this.email
    }
    getPassword(){
        return this.password
    }
    getRole(){
        return this.role
    }

};

export interface UserBD{
    id: string,
    name: string
    email: string
}

export interface FeedDB{
    id: string,
    title: string,
    description: string,
    date: string,
    user_id: string,
    name: string
}