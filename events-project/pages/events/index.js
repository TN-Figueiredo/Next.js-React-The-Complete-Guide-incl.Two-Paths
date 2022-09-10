import React from "react";
import { useRouter } from "next/router";

import EventsSearch from "../../components/events/events-search";
import EventList from "../../components/events/event-list";

import { getAllEvents } from "../../helpers/api-util";

const EventsPage = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (year, month) =>
    router.push(`/events/${year}/${month}`);

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default EventsPage;
