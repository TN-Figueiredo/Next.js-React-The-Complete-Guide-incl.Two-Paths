import React from "react";

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import { getAllEvents } from "../helpers/api-util";

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
