import {NewOrderDTO, OrderDTO, OrderViewDTO} from '../dto/dto';
import axios from 'axios';
import {config} from '../config/config';
import {List} from 'antd';

const newOrder = async (order: NewOrderDTO): Promise<any> => {
    const response = await axios.post(
        `${config.serverPrefix}/api/order/newOrder`,
        { ...order },
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }
    );

    if (response.status !== 200) {
        return Promise.reject();
    }
    return Promise.resolve(response.data);
};


const getAllOrders = async (): Promise<OrderViewDTO[]> => {
    const response = await axios.get(
        `${config.serverPrefix}/api/order/all`,
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }
    );

    if (response.status !== 200) {
        return Promise.reject();
    }

    return Promise.resolve(response.data)
}

export const orderService = {
    newOrder,
    getAllOrders
};
