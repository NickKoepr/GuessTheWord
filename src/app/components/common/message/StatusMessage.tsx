import "./StatusMessage.css";

export default function StatusMessage({ message }: { message: string }) {
  return (
    <>
      <p className="status-message" role="alert">
        {message}
      </p>
    </>
  );
}
