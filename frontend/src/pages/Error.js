import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occured";
  let message = "Something went wrong";

  if (error.status === 500) {
    message = error.data.message;
  }

  return (
    <>
      <MainNavigation />
      <main>
        <PageContent title={title}>
          <p>{message}</p>
        </PageContent>
      </main>
    </>
  );
}

export default ErrorPage;
