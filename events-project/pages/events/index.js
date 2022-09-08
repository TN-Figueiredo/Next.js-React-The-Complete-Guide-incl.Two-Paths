import React from "react";
import { useRouter } from "next/router";

import EventsSearch from "../../components/events/events-search";
import EventList from "../../components/events/event-list";

import { getAllEvents } from "../../dummy-data";

const EventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (year, month) =>
    router.push(`/events/${year}/${month}`);

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default EventsPage;
