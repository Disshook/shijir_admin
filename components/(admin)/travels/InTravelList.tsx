import { Travel } from "@/types/travel";

interface InTravelListProps {
  travels: Travel[]; // Accept an array of Travel objects as a prop
}

const InTravelList = ({ travels }: InTravelListProps) => {
  return (
    <div>
      <h2>Inbound Travels</h2>
      <ul>
        {travels.map((travel) => (
          <li key={travel?._id}>
            {travel?.title} - {travel?.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InTravelList;
