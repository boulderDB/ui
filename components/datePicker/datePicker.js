import moment from "moment";

export default function DatePicker({ value, ...rest }) {
  const date = moment(value, moment.ISO_8601);

  return (
    <input
      type={"datetime-local"}
      {...rest}
      value={date.format("YYYY-MM-DDTHH:mm")}
    />
  );
}
