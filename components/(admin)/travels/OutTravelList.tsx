import { Travel } from "@/types/travel";

interface OutTravelListProps {
  travels: Travel[]; // Accept an array of Travel objects as a prop
}

const OutTravelList = ({ travels }: OutTravelListProps) => {
  return (
    <div>
      <h2>Outbound Travels</h2>
      {travels.length > 0 ? (
        <ul>
          {travels.map((travel) => (
            <li key={travel?._id}>
              {travel.title} - {travel.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No outbound travels available.</p>
      )}
    </div>
  );
};

export default OutTravelList;
