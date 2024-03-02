import { GoAlert } from "react-icons/go";

function ErrorMessage({ message }) {
  return (
    <div>
      <GoAlert />
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
