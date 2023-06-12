import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

function EventsRoot() {
  return (
    <>
      <h1>Events Root</h1>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsRoot;
