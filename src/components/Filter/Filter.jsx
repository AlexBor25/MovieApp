import React from 'react';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Filter = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Search" key="1" />
    <TabPane tab="Rated" key="2" />
  </Tabs>
);

export default Filter;