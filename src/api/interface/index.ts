// * 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: {
      [key: string]: boolean;
    }
  }
}


// 用户列表
export interface User {
  guid: string;
  id: string;
  age: number;
  name: string;
  gender: 0 | 1;
  date: string;
  address: string;
}