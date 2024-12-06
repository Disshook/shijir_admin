"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash, Eye, Edit } from "lucide-react";
import axiosInstance from "@/hooks/axios";

export default function ReportsAdmin() {
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error messages
  const [reports, setReports] = useState<any[]>([]); // For storing reports

  const handleDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axiosInstance
          .delete("report/" + id)
          .then(() => {
            alert("Амжилттай устгагдлаа");
            window.location.reload();
          })
          .catch(() => alert("Алдаа гарлаа"));
      }
    }
  };

  // Fetch reports on load
  const fetchReports = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const res = await fetch("https://shijirback.tanuweb.cloud/api/v1/report");
      const data = await res.json();
      setReports(data.data); // Assuming `data.data` contains the reports
    } catch (error) {
      setError("Error fetching reports: ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(); // Fetch reports on page load
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-8 mt-8  ml-[4%]">
      <Link
        href="/report/add"
        className="px-3 py-1 sm:px-4 sm:py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-sm sm:text-base "
      >
        <span>Тайлан нэмэх</span>
      </Link>

      {/* Reports Table */}
      <div className="mt-8 bg-white shadow-md rounded-md p-4 w-full max-w-5xl flex flex-col items-start justify-start">
        <h2 className="text-xl font-semibold mb-4 px-4">
          Таны оруулсан тайлан
        </h2>
        {loading ? (
          <p className="text-center">Loading reports...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">№</th>
                  <th className="px-4 py-2">Жил/Сар</th>
                  <th className="px-4 py-2">Тайлбар</th>
                  <th className="px-4 py-2">PDF файлууд</th>
                  <th className="px-4 py-2">Оруулсан хугацаа</th>
                  <th className="px-4 py-2">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={report._id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {report.year}оны
                      <ul className="space-y-1">
                        {report.months.map((month: any, idx: any) => (
                          <li
                            key={idx}
                            className="flex justify-between text-xs"
                          >
                            <span className="font-semibold">
                              {month.month}сар
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2">
                      <ul className="space-y-1">
                        {report.months.map((month: any, idx: any) => (
                          <li
                            key={idx}
                            className="flex justify-between text-xs"
                          >
                            <span className="font-semibold line-clamp-4">
                              {month.score}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2">{report.pdfFile}</td>

                    <td className="px-4 py-2 w-[160px] text-center">
                      {new Date(report.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Link
                          href={"/report/edit/" + report._id}
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <Edit
                            size={18}
                            color="blue"
                            className="cursor-pointer text-orange-500"
                          />
                        </Link>
                        <Trash
                          color="red"
                          size={20}
                          className="cursor-pointer"
                          onClick={() => {
                            handleDelete(report._id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
