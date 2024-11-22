"use client";

import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "./ui/Pin";
import Link from "next/link";

// Fungsi untuk memformat tanggal
const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split(" ")[0].split("/"); // Pisahkan tanggal, bulan, tahun
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
};

const Portfolio = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<any[]>([]); // Menyimpan data proyek
  const [loading, setLoading] = useState(true); // Menandakan status loading
  const [error, setError] = useState<string | null>(null); // Menyimpan pesan error

  // Mengambil data proyek dari API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://bizup.id/api2/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data.projectList);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  // Menghitung jumlah total halaman
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Mendapatkan proyek untuk halaman aktif
  const currentProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fungsi untuk pindah halaman
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-20 my-20">
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h1 className="heading">
            Full Portfolio{" "}
            <span className="text-purple">
              — A Showcase of Innovation and Expertise
            </span>
          </h1>
          <img src="./logo.png" alt="logo" width={350} />
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Code for All, Rise and Call
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {currentProjects.map((item) => (
          <div
            className="sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
            key={item.id}
          >
            <PinContainer title={formatDate(item.createdAt)} href={item.link}>
              <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={item.imgUrl}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{ color: "#BEC1DD" }}
              >
                {item.des}
              </p>

              {/* Bagian Icon */}
              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists?.map((icon: any, index: number) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{ transform: `translateX(-${5 * index + 2}px)` }}
                    >
                      <img
                        src={icon.iconUrl || icon}
                        alt="Icon"
                        className="p-2"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <Link href={item.link} target="_blank">
                    <p className="flex lg:text-xl md:text-xs text-sm text-purple cursor-pointer">
                      Check Live Site
                    </p>
                  </Link>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <div className="flex space-x-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-purple px-4 py-2 border rounded-md"
          >
            Prev
          </button>
          <span className="flex items-center text-white">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-purple px-4 py-2 border rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
