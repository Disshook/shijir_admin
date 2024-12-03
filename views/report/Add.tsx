import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReportsAdmin() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [year, setYear] = useState<number | string>(""); // Store year input
  const [months, setMonths] = useState<{ month: string; score: string }[]>([]); // Store months and scores
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error messages
  const [reports, setReports] = useState<any[]>([]); // For storing reports
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]); // Get the first file selected
    }
  };

  const handleAddMonth = () => {
    setMonths([...months, { month: "", score: "" }]);
  };

  const handleMonthChange = (
    index: number,
    field: "month" | "score",
    value: string
  ) => {
    const updatedMonths = [...months];
    updatedMonths[index][field] = value;
    setMonths(updatedMonths);
  };

  // Handle file upload and report creation
  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Make sure required fields are filled
    if (!selectedFile || !year || months.length === 0) {
      alert("Please fill in all fields, including selecting a file.");
      return;
    }

    const formData = new FormData();

    // Append the `year` as a string
    formData.append("year", String(year)); // Convert `year` to a string
    formData.append("months", JSON.stringify(months)); // `months` is already an array of objects
    formData.append("file", selectedFile); // Upload the file

    setLoading(true);
    setError(null); // Reset error state

    try {
      const res = await fetch("https://shijir.tanuweb.cloud/api/v1report", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Таны тайланг амжилттай нэмлээ");
        setSelectedFile(null); // Reset file input
        setYear(""); // Reset year input
        setMonths([]); // Reset months
        fetchReports(); // Refresh the reports table
        router.push("/FeedbackEvent");
      } else {
        const err = await res.json();
        alert("Error uploading file: " + err.message);
      }
    } catch (error) {
      setError("Upload error: ");
    } finally {
      setLoading(false);
    }
  };

  // Fetch reports on load
  const fetchReports = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const res = await fetch("https://shijir.tanuweb.cloud/api/v1report");
      const data = await res.json();
      setReports(data.data); // Assuming `data.data` contains the reports
    } catch {
      setError("Error fetching reports: ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(); // Fetch reports on page load
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-14 flex justify-start items-start flex-col ">
      {/* Upload Form */}
      <form
        onSubmit={handleFileUpload}
        className="bg-white p-6 shadow-md rounded-md max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Тайлангаа оруулах</h2>

        {/* Year Input */}
        <div className="flex items-center">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Жилээ оруулна уу"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            required
          />
          <button
            type="button"
            onClick={handleAddMonth}
            className="mb-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 ml-2 w-[150px]"
          >
            Сар нэмэх
          </button>
        </div>

        {/* Months Input */}
        {months.map((month, index) => (
          <div key={index} className="flex flex-col space-y-4 mb-4">
            <input
              type="number"
              placeholder="Cараа оруулна уу"
              value={month.month}
              onChange={(e) =>
                handleMonthChange(index, "month", e.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Тайлбараа оруулна уу"
              value={month.score}
              onChange={(e) =>
                handleMonthChange(index, "score", e.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}

        {/* File Input */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Тайлангаа оруулж байна..." : "Тайлангаа оруулах"}
        </button>
      </form>

      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
    </div>
  );
}
