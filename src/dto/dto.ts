import {TicketDTO} from '../service/types';

export interface LoginResponseDTO {
  username: string;
  authorities: string[];
  token: string;
}

export interface BusinessEventDTO {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface ManagerSignUpDTO {
  username: string;
  password: string;
  businessName: string;
}

export interface BusinessInfoEventDTO {
  name: string;
  description: string;
}

export interface UserSignUpDTO {
  username: string;
  password: string;
  firstName: string;
}

export interface UserDetailsDTO {
  firstName: string;
  lastName: string;
  username: string;
}

export interface OrderItemDTO {
  id: string;
  quantity: number;
}

export interface NewOrderDTO {
  items: OrderItemDTO[];
}

export interface OrderDTO {
  id: string;
  valid: boolean;
}

export interface OrderViewDTO {
  id: string;
  tickets: OrderTicket[]
}

export interface OrderTicket {
  id: string;
  ticketCode: string;
  valid: boolean;
  ticket: TicketDTO
  price: number;
}

export interface DashboardViewDTO {
  totalIncome: number;
  ticketsSold: number;
  events: EventStatsDTO[]
}

export interface EventStatsDTO {
  id: string
  name: string;
  soldTickets: number;
  totalAmount: number;
}
