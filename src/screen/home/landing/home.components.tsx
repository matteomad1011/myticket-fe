import {Card, Layout, Space} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {EventsList} from '../component/eventsList/eventsList.component';
import {useEffect, useState} from 'react';
import {EventDTO} from '../../../service/types';
import {eventService} from '../../../service/event.service';
import Search from 'antd/es/input/Search';

export const HomePageComponent = () => {

    const [upComing, setUpComing] = useState<EventDTO[]>([]);
    const [allEvents, setAllEvents] = useState<EventDTO[]>([])
    const [searchEvents, setSearchEvents] = useState<EventDTO[]>([])

    const onSearch = async (value: string) => {
        if(!value){
            setSearchEvents([])
            return
        }
        eventService.getPublicEventsByName(value.toLowerCase()).then(data => {
            console.log(data);
          setSearchEvents(data)
        })
            .catch(() => {
                console.log("Error searching");
            })
    }


    useEffect(() => {
        fetchUpcoming();
        fetchAllEvents()
    }, []);

    const fetchUpcoming = async () => {
        const response = await eventService.getUpcomingEvents();
        setUpComing(response);
        console.log(response);
    };

    const fetchAllEvents = async  () => {
        const response = await eventService.getAllPublicEvents();
        setAllEvents(response)
    }

    return <Layout style={{padding: "24px", alignItems:"center"}}>
        <Content style={{width: "100%",  maxWidth: "1440px"}}>
            <Card>
                <Space>
                <Search placeholder="input search text" onSearch={onSearch} enterButton />
                </Space>

            </Card>
            {
                searchEvents.length != 0 && <EventsList events={searchEvents} title="Search Events" />
            }
            <EventsList events={upComing} title="Upcoming Events" />
            <EventsList events={allEvents} title="All Events" />
        </Content>
    </Layout>
}
