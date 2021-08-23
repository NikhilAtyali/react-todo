import React,{useState} from 'react';
import { Sidebar } from './Sidebar';
import Task from './Task';

export const Content = () => {
    const [selectedTab, setSelecedTab] = useState("INBOX");
    return (
        <section className="content">
            <Sidebar selectedTab={selectedTab} setSelectedTab={setSelecedTab}  />
            <Task selectedTab={selectedTab}/>
        </section>
    );
}

export default Content;
