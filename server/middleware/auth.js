
import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers) {
    res.status(403).send({ error: 'forbbiden' });
  } else {
    const [_, token] = headers.split(' ');
    req.token = token;
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) {
        res.status(403).send({ error: 'forbbiden' });
      } else {
        res.locals.tokenData = authData;
        next();
      }
    })
  }
}

export default authMiddleware;