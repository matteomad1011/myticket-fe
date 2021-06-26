import {Card, Tag} from 'antd';
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { EventDTO } from "../../../../service/types";
import Title from 'antd/es/typography/Title';
import {format} from 'date-fns'

export interface EventCardProps {
  event: EventDTO;
}
export const EventCard: FC<EventCardProps> = ({ event }) => {
  const h = useHistory();

  const handleClick = () => {
    console.log("Open Event ", event.id);
    h.push(`/events/${event.id}`);
  };
  return (
    <Card title={event.title} hoverable onClick={() => handleClick()} extra={<Tag color={"blue"}>{format(new Date(event.date), "dd MMM")}</Tag>}>
      {event.description}
    </Card>
  );
};
