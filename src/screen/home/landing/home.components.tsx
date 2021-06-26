import {Layout} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {EventsList} from '../component/eventsList/eventsList.component';
import {useEffect, useState} from 'react';
import {EventDTO} from '../../../service/types';
import {eventService} from '../../../service/event.service';

export const HomePageComponent = () => {

    const [upComing, setUpComing] = useState<EventDTO[]>([]);
    const [allEvents, setAllEvents] = useState<EventDTO[]>([])

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
            <EventsList events={upComing} title="Upcoming Events" />
            <EventsList events={allEvents} title="All Events" />
        </Content>
    </Layout>
}
