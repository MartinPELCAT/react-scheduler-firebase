import React, { Component, createContext } from "react";
import { ScheduleEvent } from "../services/ScheduleEvent";

export interface IEventContext {
  addScheduleEvent?(): void;
  removeScheduleEvent?(): void;
  scheduleEvents?: Array<ScheduleEvent>;
  setScheduleEvents?(events: Array<ScheduleEvent>): void;
}

export const ContextEvent = createContext<IEventContext>({});

interface States {
  scheduleEvents: Array<ScheduleEvent>;
}
export default class EventContext extends Component<{}, States> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      scheduleEvents: [],
    };
  }

  handleSetScheduleEvents = (scheduleEvents: Array<ScheduleEvent>) => {
    this.setState({
      scheduleEvents: this.getDistinctScheduleEvents(scheduleEvents),
    });
  };

  getDistinctScheduleEvents = (
    scheduleEvents: Array<ScheduleEvent>
  ): Array<ScheduleEvent> => {
    return this.state.scheduleEvents.concat(
      scheduleEvents.filter(
        (item) =>
          this.state.scheduleEvents.findIndex((ev) => ev.id === item.id) < 0
      )
    );
  };
  render() {
    return (
      <ContextEvent.Provider
        value={{
          scheduleEvents: this.state.scheduleEvents,
          setScheduleEvents: this.handleSetScheduleEvents,
        }}
      >
        {this.props.children}
      </ContextEvent.Provider>
    );
  }
}
