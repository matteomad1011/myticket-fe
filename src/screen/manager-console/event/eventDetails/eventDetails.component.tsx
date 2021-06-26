import {
  Button,
  Descriptions,
  Form,
  Input,
  Modal,
  PageHeader,
  Space,
  Table,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventService } from "../../../../service/event.service";
import { ticketService } from "../../../../service/ticket.service";
import { EventDTO, TicketDTO } from "../../../../service/types";

export const EventDetails = () => {
  let { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<EventDTO>();
  const [modalOpen, setModalOpen] = useState(false);

  const [titleTicket, setTitleTicket] = useState("");
  const [priceTicket, setPriceTicket] = useState(0);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const response = await eventService.getEventById(id);
    console.log(response);
    setEvent(response);
  };

  const handleDeleteTicket = (id: string) => {
    ticketService.deleteById(id).then(() => {
      fetch();
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: any) => `${price}€`,
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "action",
      render: (id: any) => (
        <Space>
          <Button type="link" danger onClick={() => handleDeleteTicket(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleOk = async () => {
    const ticket: TicketDTO = {
      price: priceTicket,
      title: titleTicket,
    };
    const response = await ticketService.addTicket(id, ticket);
    console.log(response);
    fetch();
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={event?.title}
        extra={[
          <Button key="1" type="primary" onClick={() => setModalOpen(true)}>
            Add Ticket
          </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Date">{event?.date}</Descriptions.Item>
          <Descriptions.Item label="Time">{event?.time}</Descriptions.Item>
        </Descriptions>
        <p>{event?.description}</p>
      </PageHeader>
      <Table dataSource={event?.tickets} columns={columns} />
      <Modal
        title="Create Ticket"
        visible={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Title" name="title">
            <Input onChange={(e) => setTitleTicket(e.target.value)} />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input
              addonBefore={"€"}
              type="number"
              onChange={(e) => setPriceTicket(parseFloat(e.target.value))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
