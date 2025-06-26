/* eslint-disable*/

import {Outlet} from "react-router-dom";

function Event() {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            <Outlet></Outlet>
        </div>
    );
}

function One() {
    return (
        <div>
            <p>볼링공 1+1 이벤트</p>
        </div>
    );
}


function Two() {
    return (
        <div>
            <p>볼링화 1+1 이벤트</p>
        </div>
    );
}

Event.one = One;
Event.two = Two;

export default Event;
export {One, Two}