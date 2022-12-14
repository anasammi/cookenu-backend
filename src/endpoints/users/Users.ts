import { Request, Response } from "express";
import { UserData } from "../../data/UserData";
import { MissingField } from "../../error/MissingFields";
import { MissingToken } from "../../error/MissingToken";
import { User, USER_ROLES } from "../../model/User";
import { Authenticator } from "../../services/Authenticator";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/idGenerator";

export class UserEndpoint {

  async createUser(req: Request, res: Response) {
    try {
      const { email, name, password, role } = req.body;

      if (!name || !email || !password || !role) {
        throw new MissingField();
      }

      if (password.length < 6) {
        throw new Error("A senha deve conter no mínimo 6 caracteres");
      }

      if(role.toUpperCase() !== USER_ROLES.NORMAL && role.toUpperCase() !== USER_ROLES.ADMIN){
        throw new Error("O usuário só pode ser do tipo NORMAL ou ADMIN")
      }

      const userData = new UserData();

      const emailExists = await userData.getUserByEmail(email);
      // se já existir o email cadastrado vai dar erro
      if (emailExists) {
        throw new Error("E-mail já cadastrado");
      }

      const id = new IdGenerator().generateId();

      const hashPassword = await new HashManager().hash(password);

      const newUser = new User(id, email, name, hashPassword, role);

      const response = await userData.createUser(newUser);
      
      const token = new Authenticator().generateToken({role, id});

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

      const token = new Authenticator().generateToken({role: userExists.getRole(), id: userExists.getId()})

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

  async followUser(req: Request, res: Response){
    try{
      const token = req.headers.authorization
      const {idToFollow} = req.body

      if(!token){
        throw new MissingToken()
      }

      const idFollower = new Authenticator().getTokenData(token)
      const followPerson = await new UserData().insertFollow(idFollower, idToFollow)
      res.status(200).send({message: followPerson})

    }
    catch(e:any){
      console.log(e.sqlMessage);
      if(e.sqlMessage?.includes("Duplicate entry")){
        res.status(500).send({message: "Você já está seguindo esse usuário"})
      } 
      res.status(e.statusCode || 500).send({message: e.message})
      
    }
  }

  async unfollowUser(req: Request, res: Response) {
    try{
      const token = req.headers.authorization
      const {idToUnfollow} = req.body

      if(!token){
        throw new MissingToken()
      }

      const idFollower = new Authenticator().getTokenData(token)
      const unfollowPerson = await new UserData().deleteFollow(idFollower, idToUnfollow)
      res.status(200).send({message: unfollowPerson})

    }
    catch(e:any){
      res.status(e.statusCode || 500).send({message: e.message})
    }
  }

  async getFeed(req: Request, res: Response) {
    try{
      const token = req.headers.authorization

      if(!token){
        throw new MissingToken()
      }

      const id = new Authenticator().getTokenData(token)
      const userData = new UserData()
      const feed = await userData.selectFeed(id)
      

      res.status(200).send(feed)

    }
    catch(e:any){
      res.status(e.statusCode || 500).send({message: e.message})
    }
  }
}
