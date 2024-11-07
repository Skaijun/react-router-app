// import { useLoaderData, json } from "react-router-dom";
// import { useRouteLoaderData, json, redirect } from "react-router-dom";

// import EventItem from "../components/EventItem";

// export default function EventDetailPage() {
//   // const data = useLoaderData();
//   const data = useRouteLoaderData("event-details");
//   const event = data.event;

//   return <EventItem event={event} />;
// }

// export async function loader({ request, params }) {
//   const id = params.id;
//   const response = await fetch(
//     ["http://localhost:8080/events", "/", id].join("")
//   );

//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch event data from the server !" },
//       { status: 500 }
//     );
//   }

//   return response;
// }

// export async function action({ params, request }) {
//   const eventId = params.id;

//   const res = await fetch("http://localhost:8080/events/" + eventId, {
//     method: request.method,
//   });

//   if (!res.ok) {
//     throw json({ message: "Failed to delete event!" }, { status: 500 });
//   }

//   return redirect("/events");
// }

// ==============
// ADVANCED VERSION WITH DEFER ONE OF REQUESTS
// 362. Controlling Which Data Should Be Deferred

// import { useLoaderData, json } from "react-router-dom";
import { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
  // const data = useLoaderData();
  const { event, events } = useRouteLoaderData("event-details");

  return (
    <>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading Event Item...</p>}
      >
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading Event Items...</p>}
      >
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

const fetchEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Could not fetch events!" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

const fetchEvent = async (eventId) => {
  const response = await fetch(
    ["http://localhost:8080/events", "/", eventId].join("")
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch event data from the server !" },
      { status: 500 }
    );
  }

  const resData = await response.json();
  return resData.event;
};

export async function loader({ request, params }) {
  const id = params.id;

  return defer({
    event: await fetchEvent(id),
    events: fetchEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.id;

  const res = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!res.ok) {
    throw json({ message: "Failed to delete event!" }, { status: 500 });
  }

  return redirect("/events");
}
