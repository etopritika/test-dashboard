type DateSelectorProps = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  availableDates: string[];
};

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  setSelectedDate,
  availableDates,
}) => {
  return (
    <div className="mb-4">
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select a date</option>
        {availableDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
