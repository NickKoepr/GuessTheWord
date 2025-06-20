import "./Title.css";

/**
 * Title component that renders a H1 title.
 * @param title
 */
export default function Title({ title }: { title: string }) {
  return (
    <>
      <h1 className="title">{title}</h1>
    </>
  );
}
