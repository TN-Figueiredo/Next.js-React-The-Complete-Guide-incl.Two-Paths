import React from "react";
import Head from "next/head";
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
    <Head>
      <title>All Events</title>
      <meta
        name="description"
        content="Find a lot of great events that allow you to evolve"
      />
    </Head>
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
