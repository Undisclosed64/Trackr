import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="h-screen flex justify-center items-center flex-col gap-4"
    >
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-lightGray">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
