import axios from "axios";
import { config } from "../config/config";
import { AccountDetailsDto } from "./types";

const getManagerAccount = async (): Promise<AccountDetailsDto> => {
  const response = await axios.get(
    `${config.serverPrefix}/api/manager/accountDetails`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  if (response.status == 200) {
    return Promise.resolve(response.data);
  }
  return Promise.reject();
};

export const managerService = {
  getManagerAccount,
};
