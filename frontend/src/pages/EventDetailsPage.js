import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <h1>Event Detail Page</h1>

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>{(event) => <EventItem event={event} />}</Await>
      </Suspense>

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(events) => <EventsList events={events} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details data" },
      {
        status: 500,
      }
    );
  } else {
    const data = await response.json();
    return data.event;
  }
}

async function loadEvents() {
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

export async function loader({ request, params }) {
  const id = params.eventsId;

  return defer({
    event: loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const id = params.eventsId;

  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event" },
      {
        status: 500,
      }
    );
  }

  return redirect("/events");
}
