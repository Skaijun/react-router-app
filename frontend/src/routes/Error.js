import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Oops, something went wrong!";

  console.log(error);

  if (error.status === 500) {
    // message = JSON.parse(error.data).message; <-- for cases other then throw json({}) in loader fn
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find a resource or page!";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
