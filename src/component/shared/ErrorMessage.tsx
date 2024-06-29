import { FiAlertTriangle } from "react-icons/fi";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex max-w-[400px] py-12 px-11">
      <FiAlertTriangle className="text-primary text-4xl" />
      <p className="text-lg font-semibold ml-4">{message}</p>
    </div>
  );
}

export default ErrorMessage;
