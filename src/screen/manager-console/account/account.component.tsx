import { Button, Descriptions, PageHeader } from "antd";
import Layout from "antd/lib/layout/layout";

import { FC, useEffect, useState } from "react";
import { config } from "../../../config/config";
import { managerService } from "../../../service/manager.service";
import { AccountDetailsDto } from "../../../service/types";

export const AccountComponent: FC = () => {
  const [accounInfo, setAccountInfo] = useState<AccountDetailsDto>({
    username: "",
    lastName: "",
    businessName: "",
    firstName: "",
  });

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const response = await managerService.getManagerAccount();

    setAccountInfo(response);
  };

  return (
    <Layout>
      <PageHeader title={`Hello ${accounInfo.username || ""}`} />
      <Layout>
        <Descriptions title="Your Account Info">
          <Descriptions.Item label="Username">
            {accounInfo.username}
          </Descriptions.Item>
          <Descriptions.Item label="Business Name">
            {accounInfo.businessName}
          </Descriptions.Item>
        </Descriptions>
      </Layout>
    </Layout>
  );
};
