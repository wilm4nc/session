import jwt from 'jsonwebtoken';
import { envs } from './envs';


const JWT_SEED = envs.JWT_SEED;

type TokenData = {
  token: string;
  expiresInSeconds: number;
};

export class JwtAdapter {

  // DI?
  
  
  static async generateToken( payload:any, duration: string = '2h' ) :  Promise<TokenData | null>  {
    
    const expiresInSeconds = 2 * 60 * 60;
    
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        
        if ( err ) return resolve(null);

        resolve({
          token: token as string,
          expiresInSeconds: expiresInSeconds
        });

      });
    });



  }


  static validateToken<T>(token: string): Promise<T | null>{
    
    return new Promise( (resolve) => {

      jwt.verify( token, JWT_SEED, (err, decoded) => {

        if( err ) return resolve(null);

        resolve(decoded as T);

      });



    });
  }


}

