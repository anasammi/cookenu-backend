// import { Request, Response } from "express";
// import { UserDatabase } from "../../data/UserDatabase";
// import { Authenticator } from "../../services/Authenticator";

// export async function getUserById(req: Request, res: Response) {
//   try {
//     const token: string = req.headers.authorization;
//     const id: string = req.params.id;

//     if (!token) {
//       res
//         .status(422)
//         .send("Esse endpoint exige uma autorização a ser passada nos headers");
//     }

//     const authenticator = new Authenticator();
//     const tokenData = authenticator.getTokenData(token);

//     const userDatabase = new UserDatabase();
//     const user = await userDatabase.getUserData(id);

//     res.status(200).send(user);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// }
