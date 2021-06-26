export interface ManagerDto {
  firstName: string;
  lastName: string;
  username: string;
  business: BusinessDto;
}

export interface BusinessDto {
  name: string;
}

export interface AccountDetailsDto {
  firstName: string;
  lastName: string;
  username: string;
  businessName: string;
}

export interface EventDTO {
  id?: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  tickets: TicketDTO[];
}

export interface TicketDTO {
  id?: string;
  price: number;
  title: string;
}
