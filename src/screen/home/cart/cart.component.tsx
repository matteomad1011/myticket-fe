import {useContext, useEffect, useState} from 'react';
import {ActionType, UserContext} from '../../../store/store';
import {Button, Card, Col, Descriptions, Layout, Modal, Result, Row, Table} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {orderService} from '../../../service/order.service';
import {OrderItemDTO} from '../../../dto/dto';

interface Item {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}


export const CartComponent = () => {
    const {state, dispatch} = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false)

    const dataSource = state.cart.items;

    let items: Item[] = [];
    let indexUsed: string[] = [];

    // Algoritmo per contare i duplicati
    dataSource.forEach(i => {
        const l = dataSource.filter(a => a.productId === i.productId).length;
        if (l > 1 && !indexUsed.includes(i.productId)) {
            console.log(indexUsed);
            items.push({
                productId: i.productId,
                name: i.name,
                quantity: l,
                price: i.price * l
            });
            indexUsed.push(i.productId);
        }

        if (l == 1) {
            items.push(i);
        }
    });


    const [total, setTotal] = useState(0);

    const columns = [
        {
            key: 'id',
            title: 'Id',
            dataIndex: 'productId'
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name'
        },
        {
            key: 'q',
            title: 'Quantity',
            dataIndex: 'quantity'
        },
        {
            key: 'price',
            title: 'Price',
            dataIndex: 'price',
            render: (price: any) => `${price}€`
        },
        {
            key: 'action',
            dataIndex: 'productId',
            render: (id: any) => <Button type={'link'} danger onClick={() => handleDelete(id)}>Delete</Button>
        }
    ];

    const handleDelete = (id: string) => {
        dispatch({type: ActionType.DeleteItem, payload: id});
    };

    const onFinishOrder = () => {
        console.log(state.cart);
        const items: OrderItemDTO[] = state.cart.items.map(i => {
            return {
                id: i.productId,
                quantity: i.quantity
            };
        });
        orderService.newOrder({
            items
        })
            .then(res => {
                console.log('Order Service: ', res);
                setModalOpen(true)
                dispatch({type: ActionType.DeleteAll});
            });
        console.log('Finish Order');
    };


    useEffect(() => {
        let total = 0;
        dataSource.forEach(a => total += a.price);

        setTotal(total);
    }, [dataSource]);

    return (
        <Layout style={{padding: '24px', alignItems: 'center'}}>
            <Content style={{maxWidth: '1440px', width: '100%'}}>
                <Row gutter={[16, 16]}>
                    <Col xs={{span: 24}} md={{span: 18}}>

                        <Table columns={columns} dataSource={items} scroll={{x: "max-content"}}/>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 6}}>
                        <Card title="Summary">
                            <Descriptions>
                                <Descriptions.Item label={'Total'}>{total}€</Descriptions.Item>
                            </Descriptions>
                            <Button type={'primary'} onClick={() => onFinishOrder()} disabled={dataSource.length == 0}>Finish
                                Order</Button>
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Modal footer={null} visible={modalOpen}>
                <Result status={'success'} title={'Order Completed'}
                        extra={[
                            <Button type={'primary'} onClick={() => setModalOpen(false)}>Close</Button>
                        ]}/>
            </Modal>
        </Layout>
    );
};
