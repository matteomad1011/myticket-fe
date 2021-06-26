import {BusinessEventDTO, DashboardViewDTO} from '../dto/dto';
import axios from 'axios';
import {config} from '../config/config';


const getDashboardView = async (): Promise<DashboardViewDTO> => {
    const response = await axios.get(`${config.serverPrefix}/api/manager/dashboard`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });

    if (response.status != 200) {
        return Promise.reject(response);
    }

    return Promise.resolve(response.data);
};

export const statisticService = {
    getDashboardView
}
