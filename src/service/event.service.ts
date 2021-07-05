import axios from "axios";
import { config } from "../config/config";
import { BusinessEventDTO, BusinessInfoEventDTO } from "../dto/dto";
import { BusinessDto, EventDTO } from "./types";

const getPublicEventsByName = async (name: string): Promise<EventDTO[]> => {
  const response = await axios.get(
      `${config.serverPrefix}/public/events/name/${name}`
  );

  if (response.status == 200) {
    return Promise.resolve(response.data);
  }

  if (response.status == 404) {
    return Promise.reject(response.status);
  }

  return Promise.reject();
};

const getPublicEventById = async (id: string): Promise<EventDTO> => {
  const response = await axios.get(
    `${config.serverPrefix}/public/events/${id}`
  );

  if (response.status == 200) {
    return Promise.resolve(response.data);
  }

  if (response.status == 404) {
    return Promise.reject(response.status);
  }

  return Promise.reject();
};

const getUpcomingEvents = async (): Promise<EventDTO[]> => {
  const response = await axios.get(
    `${config.serverPrefix}/public/events/upcoming`
  );

  return Promise.resolve(response.data);
};

const getEventById = async (id: string): Promise<EventDTO> => {
  const response = await axios.get(
    `${config.serverPrefix}/api/manager/event/${id}`,
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

const getBusinessEvents = async (): Promise<BusinessEventDTO[]> => {
  const response = await axios.get(`${config.serverPrefix}/api/manager/event`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (response.status != 200) {
    return Promise.reject(response);
  }

  return Promise.resolve(response.data);
};

const createEvent = async (
  event: BusinessEventDTO
): Promise<BusinessEventDTO> => {
  const response = await axios.post(
    `${config.serverPrefix}/api/manager/event`,
    { ...event },
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

const deleteEvent = async (id: string) => {
  await axios.delete(`${config.serverPrefix}/api/manager/event/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

const getBusinessInfoByEventId = async (
  id: string
): Promise<BusinessInfoEventDTO> => {
  const res = await axios.get(
    `${config.serverPrefix}/public/business/event/${id}`
  );

  if (res.status == 200) {
    return Promise.resolve(res.data);
  }

  return Promise.reject();
};


const getAllPublicEvents = async () : Promise<EventDTO[]> => {
  const response = await axios.get(
      `${config.serverPrefix}/public/events/all`
  );

  return Promise.resolve(response.data);

}

export const eventService = {
  getBusinessEvents,
  createEvent,
  deleteEvent,
  getEventById,
  getUpcomingEvents,
  getPublicEventById,
  getBusinessInfoByEventId,
  getAllPublicEvents,
  getPublicEventsByName
};
