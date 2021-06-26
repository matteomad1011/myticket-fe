import {FC, useEffect, useState} from 'react';
import {OrderDTO, OrderViewDTO, UserDetailsDTO} from '../../../dto/dto';
import {userService} from '../../../service/user.service';
import {orderService} from '../../../service/order.service';
import {PageHeader, Row, Space, Statistic, Table, Tag} from 'antd';
import {TicketDTO} from '../../../service/types';

export const OrdersComponent: FC = () => {

    const [orders, setOrders] = useState<OrderViewDTO[]>();
    const [selected, setSelected] = useState(null)

    const [total, setTotal] = useState(0)

    useEffect(() => {

        orderService.getAllOrders().then(res => {
            setOrders(res);
            console.log("Fetch Orders: ", res);
        });
    }, []);

    useEffect(() => {
        if(orders){
            let s = 0;
            for (const o of orders){
                for(const ticket of o.tickets){
                    s += ticket.price
                }
            }
            setTotal(s)
        }
    },[orders])

    const columns = [{
        title: 'Order Id',
        dataIndex: 'id',
        key: 'id'
    },
        {
            title: "Tickets",
            dataIndex: "tickets",
            key: "tickets",
            render: (t:any) => <Space><Tag color={"green"}>{t.length}</Tag> tickets</Space>
        },
        {
          title: "Total",
          dataIndex: "tickets",
          key: "total",
          render: (t:any) => <strong>{t.reduce((a: any,b:any) => a + b.price, 0)} €</strong>
        },
        {
            title: "Actions",
            dataIndex: "id",
            key: "actions",
            render: (t:any) => <a onClick={() => setSelected(t)}>Show more</a>
        }
        ];

    if (!orders) {
        return <div>Loading</div>;
    }

    const orderDetails = () => {

        const order = orders.find(o => o.id === selected)

        console.log(order);

        const col = [
            {
                title: "Order id",
                key: "id",
                dataIndex: "id"
            },
            {
                title : "Ticket Name",
                key: "name",
                dataIndex: "ticket",
                render: (t:any) => t.title
            },
            {
                title: "Price",
                key: "price",
                dataIndex: "price",
                render: (t:any) => t + "€"
            },
            {
                title: "Ticket code",
                dataIndex: "ticketCode",
                key: "code"
            },
            {
                title: "Validity",
                dataIndex: "valid",
                key: "valid",
                render: (v: any) => v ? <Tag color={"green"}>Valid</Tag> : <Tag color={"red"}>Not Valid</Tag>
            }
        ]
        if(order){

            let sum = order.tickets.reduce((a, b) => a+ b.price, 0)


        return (<div style={{ width: "100%", maxWidth: "1440px"}}>
            <PageHeader
                onBack={() => setSelected(null)}
                title={`Order ${order.id}`}

            >
                <Row>
                    <Statistic title={"Total"} prefix={"€"} value={sum} />
                </Row>
            </PageHeader>
            <Table dataSource={order.tickets} columns={col} scroll={{x:"max-content"}}/>
        </div>)
        }
    }

    return <>
        {
            selected ? orderDetails() :
                <div style={{width: "100%", maxWidth: "1440px"}}>
                    <PageHeader title={"Your Orders"}>
                        <Row>
                            <Statistic title={"Total"} value={total} prefix={"€"} />
                        </Row>
                    </PageHeader>
                    <Table dataSource={orders} columns={columns} scroll={{x:"max-content"}}/>
                </div>
        }

    </>;
};
