import {
  Carousel,
  Divider,
  Empty,
  Comment,
  Avatar,
  PageHeader,
  Statistic,
  Row,
  Space,
  List,
  Col,
  Button, message, Spin,
} from 'antd';
import Layout, { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BusinessInfoEventDTO } from "../../../../dto/dto";
import { eventService } from "../../../../service/event.service";
import { mockService } from "../../../../service/mock.service";
import { ticketService } from "../../../../service/ticket.service";
import { EventDTO, TicketDTO } from "../../../../service/types";
import {format, parse} from 'date-fns';
import { authService } from "../../../../service/auth.service";
import { ActionType, UserContext } from "../../../../store/store";

export const EventDetailPage = () => {
  const { id } = useParams<any>();

  const [event, setEvent] = useState<EventDTO>();
  const [business, setBusiness] = useState<BusinessInfoEventDTO>();
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch();
    fetchBusinessInfo();
    setImage(mockService.getRandomImage());
  }, []);

  const fetch = async () => {
    eventService
      .getPublicEventById(id)
      .then((res) => {
        setEvent(res);
      })
      .catch((e) => {
        if (e == 400) {
          setError(true);
        }
      });
  };

  const fetchBusinessInfo = async () => {
    eventService
      .getBusinessInfoByEventId(id)
      .then((res) => {
        console.log("!!", res);
        setBusiness(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleBuyTicket = (id: string | undefined) => {
    if (!id) return;

    message.success("Ticket Added in the Cart")

    dispatch({ type: ActionType.AddItem, payload: {
      id: id,
        name: event?.title + " - " +  event?.tickets.find(t => t.id === id)?.title || "",
        price: event?.tickets.find(t => t.id === id)?.price || 0
      } });
  };

  if (event && business) {
    return (
      <Layout>
        <Carousel autoplay>
          <div>
            <div>
              <img src={image} style={{ width: "100%", maxHeight: "350px" }} />
            </div>
          </div>
        </Carousel>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title={event.title}
        >
          <Row>
            <Space size={20}>
              <Statistic
                title="Date"
                value={
                  format(new Date(event.date), "dd MMM")
                }
              />
              <Statistic title="Time" value={format(parse(event.time, "HH:mm:ss", new Date()), "HH:mm") || "No Time"} />
              <Statistic
                title="Starting from"
                prefix="$"
                value={
                  event.tickets.length >= 1
                    ? event.tickets.reduce((a, b) =>
                        a.price < b.price ? a : b
                      ).price
                    : 0
                }
                style={{
                  margin: "0 32px",
                }}
              />
            </Space>
          </Row>
        </PageHeader>
        <Divider />
        <Row>
          <Col xs={{span: 24}} lg={{span: 18}}>
            <Content style={{ padding: "16px" }}>
              <Title level={3}>About the event</Title>
              <Title level={4}>{event.title}</Title>
              <p>{event.description}</p>
              <Divider />
              <Title level={3}>Tickets</Title>
              {authService.isLogged() && authService.getRole() == "USER" ? (
                <List
                  itemLayout="horizontal"
                  dataSource={event.tickets}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <a
                          key="list-loadmore-more"
                          onClick={() => handleBuyTicket(item.id)}
                        >
                          <Button type={"primary"}>Add to Cart</Button>
                        </a>,
                      ]}
                    >
                      <List.Item.Meta
                          style={{alignItems: 'center'}}
                        avatar={
                          <Avatar
                            size={"large"}
                            style={{ backgroundColor: "coral" }}
                          >
                            {item.price || 0}€
                          </Avatar>
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty
                  description={
                    <span>You must be Logged in to see Tickets</span>
                  }
                >
                  <Link to="/login">Login</Link>
                </Empty>
              )}
              <Divider />
              <Title level={3}>About the organizer</Title>
              <Comment
                author={business.name}
                avatar={<Avatar />}
                content={<p>{business.description}</p>}
              />
            </Content>
          </Col>
        </Row>
      </Layout>
    );
  } else {
    return <div><Spin /></div>;
  }
};
