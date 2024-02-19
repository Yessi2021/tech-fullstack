import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/jwt";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (
  req: Request<unknown, unknown, RegisterBody>,
  res: Response
) => {
  const { name, email, password } = req.body;

  try {
    const userRepository = getRepository(User);
    let user = await userRepository.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "A user already exists with that email",
      });
    }

    user = userRepository.create({ name, email, password });
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await userRepository.save(user);

    const token = await generarJWT(user.id.toString(), user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

export const login = async (
  req: Request<unknown, unknown, LoginBody>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "No user found with that email",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect password",
      });
    }

    const token = await generarJWT(user.id.toString(), user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};
