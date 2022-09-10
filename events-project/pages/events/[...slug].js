import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import ResultsTitle from "../../components/events/results-title";
import EventList from "../../components/events/event-list";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";
import Button from "../../components/ui/button";

const FilteredEvents = (
  {
    // hasError, events, createdAt
  }
) => {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const filterData = router.query.slug;

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error } = useSWR(
    "https://nextjs-events-b8332-default-rtdb.firebaseio.com/events.json", fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(events);
    }
  }, [data]);

  if (!events) {
    return <p className="center">Loading...</p>;
  }

  let year, month;

  if (filterData) {
    year = +filterData[0];
    month = +filterData[1];
  }

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month > 12 ||
    month < 1 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export const getServerSideProps = async ({ params }) => {
//   const filterData = params.slug;

//   const year = +filterData[0];
//   const month = +filterData[1];

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month > 12 ||
//     month < 1
//   ) {
//     return {
//       hasError: true,
//       // notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const events = await getFilteredEvents({ year, month });

//   return {
//     props: {
//       events,
//       createdAt: {
//         year,
//         month,
//       },
//     },
//   };
// };

export default FilteredEvents;
