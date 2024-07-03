import { FiAlertTriangle, FiSmile } from "react-icons/fi";

interface MessageProps {
  message: string;
  error?: boolean;
}

function Message({ message, error }: MessageProps) {
  return (
    <div className="flex max-w-[400px] py-12 px-11 items-center m-auto">
      {error ? (
        <FiAlertTriangle className="text-primary h-10 w-10" />
      ) : (
        <FiSmile className="text-primary h-10 w-10" />
      )}
      <p className="text-lg font-semibold ml-4 max-w-60 text-center">
        {message}
      </p>
    </div>
  );
}

export default Message;
