import "./DefaultSelector.css";

interface DefaultSelectorProps {
  items: Array<string>;
  selected: string;
  onSelectChange: (value: string) => void;
}

export default function DefaultSelector({
  items,
  selected,
  onSelectChange,
}: DefaultSelectorProps) {
  return (
    <>
      <select
        value={selected}
        onChange={(e) => onSelectChange(e.target.value)}
        aria-label="Select the language you want to play this game in."
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}
