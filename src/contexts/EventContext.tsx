import React, { Component, createContext } from "react";
import { ScheduleEvent } from "../services/ScheduleEvent";

interface IEventContext {
  addScheduleEvent?(): void;
  removeScheduleEvent?(): void;
  scheduleEvents?: Array<ScheduleEvent>;
}

export const ContextEvent = createContext<IEventContext>({});

export default class EventContext extends Component {
  render() {
    return <div></div>;
  }
}
