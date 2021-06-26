import axios from "axios";
import { config } from "../config/config";
import { TicketDTO } from "./types";

const getTicketById = async (id: string): Promise<TicketDTO> => {
  const response = await axios.get(
    `${config.serverPrefix}/public/tickets/${id}`
  );

  console.log(response);

  if (response.status == 200) {
    return Promise.resolve(response.data);
  }

  if (response.status == 404) {
    return Promise.reject(response.status);
  }

  return Promise.reject();
};

const deleteById = async (id: string): Promise<any> => {
  const response = await axios.delete(
    `${config.serverPrefix}/api/manager/ticket/${id}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  if (response.status != 200) {
    return Promise.reject();
  }
  return Promise.resolve();
};

const addTicket = async (eventId: string, ticket: TicketDTO): Promise<any> => {
  const response = await axios.post(
    `${config.serverPrefix}/api/manager/event/${eventId}/ticket`,
    { ...ticket },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  if (response.status != 200) {
    return Promise.reject();
  }
  return Promise.resolve(response.data);
};

export const ticketService = {
  deleteById,
  addTicket,
  getTicketById,
};
