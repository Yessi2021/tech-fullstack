import jwt from "jsonwebtoken";

export const generarJWT = (uid: string, name: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      "Esto-Es-UnA-Palb@_SecretA123457",
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("No se pudo generar el token");
        }

        if (token) {
          resolve(token);
        } else {
          reject("No se pudo generar el token");
        }
      }
    );
  });
};

export default { generarJWT };
