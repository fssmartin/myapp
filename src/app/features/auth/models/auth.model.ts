 export interface LoginUser {
  username: string;
  email: string;
}

 export interface BaseUser {
  id: number;
  name: string;
  email: string;
  firstN: string;
  lastN: string;
  gender: string;
  image: string;
}

 export interface User extends BaseUser {
  accessToken: string;
  refreshToken: string;
}



