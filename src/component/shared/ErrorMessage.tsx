import { GoAlert } from "react-icons/go";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div>
      <GoAlert />
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
