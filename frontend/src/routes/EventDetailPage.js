import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id;

  return <h1>EventDetailPage Page!  EVENT: {id} </h1>;
}
