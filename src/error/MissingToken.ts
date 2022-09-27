import { BaseError } from "./BaseError";

export class MissingToken extends BaseError{
    constructor(){
        super("O token deve ser passado", 404)
    }
}