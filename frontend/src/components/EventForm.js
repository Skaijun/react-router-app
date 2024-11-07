import {
  useNavigation,
  useNavigate,
  useActionData,
  Form,
  json,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();

  // state: "idle" | "loading" | "submitting"
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  let saveButton = <button>Save</button>;
  if (isSubmitting) {
    saveButton = <button disabled>Submitting...</button>;
  }

  return (
    <Form method={method} className={classes.form}>
      {actionData && actionData.errors && (
        <div>
          <h3>{actionData.message}</h3>
          {Object.keys(actionData.errors).map((err) => (
            <p>{actionData.errors[err]}</p>
          ))}
        </div>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        {saveButton}
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const form = await request.formData();
  const eventData = {
    title: form.get("title"),
    image: form.get("image"),
    date: form.get("date"),
    description: form.get("description"),
  };

  let url = "http://localhost:8080/events";
  if (request.method === "PATCH") {
    url = url + "/" + params.id;
  }

  const res = await fetch(url, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (res.status === 422) {
    return res;
  }

  if (!res.ok) {
    throw json({ message: "Failed to send events data!" }, { status: 500 });
  }

  return redirect("/events");
}
