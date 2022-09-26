import { BaseError } from "./BaseError";

export class MissingField extends BaseError{
    constructor(){
        super("Parâmetros faltando", 404)
    }
}