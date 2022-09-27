import { Request, Response } from "express";
import { UserData } from "../../data/UserData";
import { MissingField } from "../../error/MissingFields";
import { MissingToken } from "../../error/MissingToken";
import { User } from "../../model/User";
import { Authenticator } from "../../services/Authenticator";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/idGenerator";

export class UserEndpoint {

  async createUser(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;

      if (!name || !email || !password) {
        throw new MissingField();
      }

      if (password.length < 6) {
        throw new Error("A senha deve conter no mínimo 6 caracteres");
      }

      const userData = new UserData();

      const emailExists = await userData.getUserByEmail(email);
      // se já existir o email cadastrado vai dar erro
      if (emailExists) {
        throw new Error("E-mail já cadastrado");
      }

      const id = new IdGenerator().generateId();

      const hashPassword = await new HashManager().hash(password);

      const newUser = new User(id, email, name, hashPassword);

      const response = await userData.createUser(newUser);
      
      const token = new Authenticator().generateToken(id);

      res.status(201).send({ message: response, token });
    } catch (e: any) {
      res.status(e.statusCode || 500).send({ message: e.message });
    }
  }

  async login(req: Request, res: Response) {
    try{
      const {email, password} = req.body
      
      if(!email || !password){
        throw new MissingField()
      }

      const userData = new UserData()

      const userExists = await userData.getUserByEmail(email)

      if(!userExists){
        throw new Error("E-mail não cadastrado")
      }

      const correctPassword = await new HashManager().compare(password, userExists.getPassword())

      if(!correctPassword){
        throw new Error("Senha incorreta")
      }

      const token = new Authenticator().generateToken(userExists.getId())

      res.status(200).send({message:"Usuário logado com sucesso", token})
    }
  
    catch(e:any) {
      res.status(e.statusCode || 500).send({message: e.message})
    }
  }

  async getUserProfile(req: Request, res: Response) {
    try{
      const token = req.headers.authorization
      
      if(!token){
        throw new MissingToken()
      }

      const id = new Authenticator().getTokenData(token)

      const userData = new UserData()

      const user = await userData.getUserById(id)

      res.status(200).send(user)
    }
  
    catch(e:any) {
      res.status(e.statusCode || 500).send({message: e.message})
    }
  }

  async getUserById(req: Request, res: Response) {
    try{
      const token = req.headers.authorization
      const {id} = req.params
      
      if(!token){
        throw new MissingToken()
      }

      new Authenticator().getTokenData(token)

      const searchId = await new UserData().getUserById(id)

      if(!searchId){
        throw new Error("Id inválido")
      }

      res.status(200).send(searchId)
    }
  
    catch(e:any) {
      res.status(e.statusCode || 500).send({message: e.message})
    }
  }

}
