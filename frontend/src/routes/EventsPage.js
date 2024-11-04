import EventsList from "../components/EventsList";

const EVENTS = [
  {
    id: "e1",
    title: "A dummy event",
    date: "2023-02-22",
    image:
      "https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg",
    description: "Join this amazing event and connect with fellow developers.",
  },
  {
    id: "e2",
    title: "A 2 event",
    date: "2023-02-21",
    image:
      "https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg",
    description: "Joissssnect with fellow developersss.",
  },
];

export default function EventsPage() {
  return <EventsList events={EVENTS} />;
}
