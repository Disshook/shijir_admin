import CommentList from "@/views/comment/CommentList";

export default async function AdminCommentPage() {
  let comments = [];

  try {
    const res = await fetch("https://taiga.tanuweb.cloud/api/v1/comment", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    comments = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }

  return (
    <>
      <CommentList comments={comments} />
    </>
  );
}
