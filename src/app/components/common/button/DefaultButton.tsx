import "./DefaultButton.css";

interface DefaultButtonProps {
  label: string;
  onClick?: () => void;
}

export default function DefaultButton({ label, onClick }: DefaultButtonProps) {
  return (
    <>
      <button className="default-button" onClick={onClick}>
        {label}
      </button>
    </>
  );
}
