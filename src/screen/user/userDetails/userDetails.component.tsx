import {FC, useEffect, useState} from 'react';
import {Descriptions} from 'antd';
import {userService} from '../../../service/user.service';
import {UserDetailsDTO} from '../../../dto/dto';

export const UserDetailsComponent : FC = ()=> {

    const [userInfo, setUserInfo] = useState<UserDetailsDTO>()

    useEffect(() => {

        userService.getUserAccountInfo().then(res => {
            setUserInfo(res)
        })
    },[])

    if(!userInfo){
        return <div>Loading</div>
    }

    return <div>
        <Descriptions title="User Info">
            <Descriptions.Item label="Username">{userInfo.username}</Descriptions.Item>
            <Descriptions.Item label="First Name">{userInfo.firstName}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{userInfo.lastName}</Descriptions.Item>
        </Descriptions>
    </div>
}
