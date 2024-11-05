import BookList from "@/views/book/BookList";

export default async function AdminBookPage() {
  let bookings = [];

  try {
    const res = await fetch("https://taiga.tanuweb.cloud/api/v1/booking", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    bookings = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }

  return (
    <>
      <BookList bookings={bookings} />
    </>
  );
}
