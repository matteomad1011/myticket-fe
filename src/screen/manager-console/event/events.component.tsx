import {
  Button,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Modal,
  PageHeader,
  Table,
  Space,
  TimePicker,
} from "antd";
import Layout from "antd/lib/layout/layout";
import { FC, useEffect, useState } from "react";
import {
  Route,
  useHistory,
  BrowserRouter as Router,
  useRouteMatch,
  Switch,
  matchPath,
  Link,
} from "react-router-dom";
import { BusinessEventDTO } from "../../../dto/dto";
import { eventService } from "../../../service/event.service";
import { EventDetails } from "./eventDetails/eventDetails.component";

export const EventsComponent: FC = () => {
  const [events, setEvents] = useState<BusinessEventDTO[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const h = useHistory();
  let match = useRouteMatch();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const response = await eventService.getBusinessEvents();
    console.log(response);
    setEvents(response);
  };

  const handleOkModal = async () => {
    const newEvent: BusinessEventDTO = {
      title: title,
      description: description,
      date: date,
      time: time,
    };
    console.log(newEvent);
    const response = await eventService.createEvent(newEvent);
    setIsModalVisible(false);
    fetch();
  };

  const handleDelete = async (id: string) => {
    await eventService.deleteEvent(id);
    fetch();
  };

  const handleEditEvent = (id: string) => {
    h.push("/manager/event/" + id);
  };

  const dateFormat = "YYYY-MM-DD";

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Tickets",
      key: "tikets",
      dataIndex: "tickets",
      render: (tickets: any) => tickets.length,
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <Space>
          <Link to={`${match.path}/event/${id}`}>Edit</Link>
          <Button type="link" danger onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  console.log(match.path);

  return (
    <Layout>
      <Switch>
        <Route path={`${match.path}/event/:id`}>
          <EventDetails />
        </Route>
        <Route>
          <PageHeader
            ghost={false}
            title="Events"
            subTitle="Manage Your Events"
            extra={[
              <Button
                key="1"
                type="primary"
                onClick={() => setIsModalVisible(true)}
              >
                Add Event
              </Button>,
            ]}
          ></PageHeader>

          <Table columns={columns} dataSource={events} />
          <Modal
            title="Add New Event"
            visible={isModalVisible}
            onOk={handleOkModal}
            onCancel={() => setIsModalVisible(false)}
          >
            <Form name="basic">
              <Form.Item label="Title" name="title">
                <Input onChange={(e) => setTitle(e.target.value)} />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input onChange={(e) => setDescription(e.target.value)} />
              </Form.Item>
              <Form.Item label="Date" name="date">
                <DatePicker
                  onChange={(date, text) => setDate(text)}
                  format={dateFormat}
                />
              </Form.Item>
              <Form.Item label="Time" name="time">
                <TimePicker onChange={(date, text) => setTime(text)} />
              </Form.Item>
            </Form>
          </Modal>
        </Route>
      </Switch>
    </Layout>
  );
};
