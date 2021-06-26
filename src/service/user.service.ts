import {UserDetailsDTO} from '../dto/dto';
import axios from 'axios';
import {config} from '../config/config';

const getUserAccountInfo = async (): Promise<UserDetailsDTO> => {

    const response = await axios.get(`${config.serverPrefix}/api/user/accountDetails`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })

    if(response.status == 200){
        return Promise.resolve({...response.data})
    }

    return Promise.reject();
}


export const userService = {
    getUserAccountInfo
}
