import {Card, Col, Divider, Layout, List, Row, Spin, Statistic, Table} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {useEffect, useState} from 'react';
import {DashboardViewDTO} from '../../../dto/dto';
import {statisticService} from '../../../service/statistic.service';

export const DashboardPage = () => {


    const [dasboardData, setDashboardData] = useState<DashboardViewDTO>()

    useEffect(() => {

        statisticService.getDashboardView().then(res => {
            setDashboardData(res)
        })
            .catch(e => {
                console.log("Error fetching dashboard");
            })
    },[])

    const col = [
        {
            key: "event",
            title: "Event",
        },
        {
            key: "ticket",
            title: "Tickets Sold"
        },
        {
            key: "action",
            title: "Actions",
            render: () => <a>Show more</a>
        }
    ]

    if(!dasboardData){
        return <Spin />
    }

    return <Layout style={{padding:16}}>
        <Content>
            <Title level={2}>Welcome</Title>
            <Divider>Statistics</Divider>
            <Row gutter={[16, 16]}>
                <Col flex={"auto"}>
                    <Card bordered>
                    <Statistic title={"Total"} prefix={"€"} value={dasboardData.totalIncome}/>
                    </Card>
                </Col>
                <Col flex={"auto"}>
                    <Card bordered>
                        <Statistic title={"Tickets Sold"} value={dasboardData.ticketsSold}/>
                    </Card>
                </Col>
            </Row>
        </Content>
    </Layout>
}
