import axios from "axios";
import { config } from "../config/config";
import { LoginResponseDTO, ManagerSignUpDTO, UserSignUpDTO } from "../dto/dto";
var jwt = require("jsonwebtoken");

export interface LoginRequestDto {
  username: string;
  password: string;
}

export enum LoginStatus {
  CORRECT,
  INCORRECT,
}

export enum UserRole {
  MANAGER = "MANAGER",
  USER = "USER",
  ADMIN = "ADMIN",
}
export interface LoginResponse {
  status: LoginStatus;
  message: string;
  roles?: UserRole[];
}

const serverPrefix = config.serverPrefix;

const registerUser = async (request: UserSignUpDTO): Promise<any> => {
  const response = await axios.post(
    `${config.serverPrefix}/api/register/user`,
    {
      ...request,
    }
  );

  if (response.status != 200) {
    return Promise.reject();
  }

  return Promise.resolve(response.data);
};
const registerManager = async (request: ManagerSignUpDTO): Promise<any> => {
  const response = await axios.post(
    `${config.serverPrefix}/api/register/manager`,
    {
      ...request,
    }
  );

  return response;
};
/**
 * Login Service, send User Data. Get the token on Success.
 * Put the token inside LocalStorage
 * @param request
 */
const login = async (request: LoginRequestDto): Promise<LoginResponseDTO> => {
  const response = await axios.post(`${config.serverPrefix}/authenticate`, {
    username: request.username,
    password: request.password,
  });

  // Valid Login
  if (response.status == 200) {
    localStorage.setItem("token", response.data.token);
    return Promise.resolve({
      username: response.data.username,
      token: response.data.token,
      authorities: response.data.authorities,
    });
  }

  return Promise.reject();
};

const isLogged = (): boolean => {
  // Checking Local Storage
  // Looking for JWT Token
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("token");
};

const getRole = (): string | null => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  return jwt.decode(token).authorities[0];
};

export const authService = {
  login,
  isLogged,
  registerManager,
  logout,
  getRole,
  registerUser,
};
