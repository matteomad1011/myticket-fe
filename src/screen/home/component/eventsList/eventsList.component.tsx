import {Card, Col, Divider, Row} from 'antd';
import { FC } from "react";
import { EventDTO } from "../../../../service/types";
import { EventCard } from "../eventCard/eventCard.component";
import "./eventsList.css";

export interface EventsListProps {
  events: EventDTO[];
  title: string;
}

export const EventsList: FC<EventsListProps> = ({ events, title }) => {
  return (
      <Card style={{marginBottom: "24px"}} title={title}>
      <div className="list">
        <Row gutter={[16, 14]}>
          {events.map((event) => (
            <Col xs={24} sm={12} lg={6} md={8} key={event.id}>
              <EventCard event={event} />
            </Col>
          ))}
        </Row>
      </div>
      </Card>
  );
};
