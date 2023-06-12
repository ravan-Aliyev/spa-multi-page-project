import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(events) => <EventsList events={events} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventsPage;

async function loadEvent() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "could not fetch events" }), {
    //   status: 500,
    // });

    throw json({ message: "Could not fetch" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvent(),
  });
}
