import { Request, Response } from "express";
import { UserDatabase } from "../../data/UserDatabase";
import { User } from "../../entities/User";
import { Authenticator } from "../../services/Authenticator";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/idGenerator";

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      res.status(422).send("Preencha corretamente todas as informações");
    }

    const userDatabase = new UserDatabase();
    const user = await userDatabase.findUserByEmail(email);
    if (user) {
      res.status(409).send("E-mail já cadastrado");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const newUser = new User(name, email, hashPassword, role, id);
    await userDatabase.createUser(newUser);

    const authenticator = new Authenticator();
    const token = authenticator.generate({ role, id });

    res.status(201).send({ message: "Usuário criado com sucesso", token });
  } catch (e) {
    res.status(400).send(e.message);
  }
}
