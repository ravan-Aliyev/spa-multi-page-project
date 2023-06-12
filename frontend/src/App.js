import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/Root";

import HomePage from "./pages/HomePage";

import EventsPage, { loader as eventLoader } from "./pages/EventsPage";

import EventDetailPage, {
  loader as detailLoader,
  action as deleteAction,
} from "./pages/EventDetailsPage";

import NewEventPage from "./pages/NewEventPage";

import EditEventPage from "./pages/EditEventPage";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";

import { action as formAction } from "./components/EventForm";

import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventLoader,
          },
          {
            path: ":eventsId",
            id: "event-detail",
            loader: detailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: formAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: formAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
