import moment from "moment"

export class Recipe{
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private date: Date,
        private userId: string,
    ){}

    getId(){
        return this.id
    }

    getTitle(){
        return this.title
    }

    getDescription(){
        return this.description
    }

    getDate(){
        return this.date
    }
    
    getUserId(){
        return this.userId
    }
    
    setData(date:any){
        this.date = date
    }

}
    