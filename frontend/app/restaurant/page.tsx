"use client";
import Gallery from "../components/gambar";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Restaurant {
  id: number;
  attributes: {
    name: string;
    description: string;
    categories: {
      data: { id: number; attributes: { name: string } }[];
    };
    restaurant_hours: { id: number; day_interval: string }[];
    image: { data: { attributes: { formats: { small: { url: string } } } }[] };
  };
}

interface HomeProps {
  restaurants: Restaurant[];
  error: Error | null;
}

const Home: React.FC<HomeProps> = ({ restaurants, error }) => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Restaurant[]>(restaurants || []);

  // Gunakan Hook effect untuk mengambil data ketika komponen dipasang
  useEffect(() => {
    // Gunakan Fungsi asinkron untuk mengambil data dan memperbarui state
    async function fetchData() {
      try {
        // Panggil fungsi getData untuk mendapatkan data dari API
        const fetchedData = await getData();

        // Perbarui state dengan data yang diambil (atau array kosong jika data tidak terdefinisi)
        setData(fetchedData.data || []);
      } catch (error) {
        // Catat pesan error jika terjadi masalah dalam pengambilan atau pembaruan data
        console.error("Error:", error);
      }
    }
    // Panggil fungsi fetchData ketika komponen dipasang
    fetchData();
  }, []); // Array dependensi kosong memastikan efek ini berjalan hanya sekali saat pemasangan

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  return (
    <div className="max-w-6xl mx-auto">
      <h2>
        Marketplace Restauran <br />
        GET DATA dengan FETCH
      </h2>
      <Link href="/restaurant/tambah">Tambah Data </Link>
      <div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari"
        ></input>
        <button
          className="bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-2 rounded"
          disabled={search === ""}
          onClick={async () => {
            const results = await fetch(
              `http://localhost:1337/api/restaurants?populate=*&filters[name][$eqi]=${search}`
            );
            const details = await results.json();
            setData(details.data || []);
          }}
        >
          CARI
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Restauran</th>
            <th>Deskripsi</th>
            <th>Kategori</th>
            <th>Waktu Operasional</th>
            <th>Gambar</th>
            <th>Detail</th>
          </tr>
        </thead>
        {data.map((resto) => (
          <tr className="hover:bg-gray-50" key={resto.id}>
            <td className="py-2 px-4 border-b">{resto.id}</td>
            <td className="py-2 px-4 border-b">{resto.attributes.name}</td>
            <td className="py-2 px-4 border-b">
              {resto.attributes.description}
            </td>
            <td className="py-2 px-4 border-b">
              {resto.attributes.categories.data.map(
                (cat) => cat.attributes.name
              )}
            </td>
            <td className="py-2 px-4 border-b">
              {resto.attributes.restaurant_hours.map((wkt) => wkt.day_interval)}
            </td>
            <td className="py-2 px-4 border-b">
              {resto.attributes.image.data.map((foto) => (
                <Gallery
                  thumbnailUrl={
                    foto.attributes.formats.small.url ||
                    resto.attributes.image.data.attributes.formats.small.url
                  }
                />
              ))}
            </td>

            <td className="py-2 px-4 border-b">
              <input type={"submit"} value="Lihat" />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

async function getData() {
  const res = await fetch("http://localhost:1337/api/restaurants?populate=*");

  // Periksa apakah respons berhasil
  if (!res.ok) {
    throw new Error("Gagal mengambil data");
  }
  // Parse body respons sebagai JSON dan kembalikan hasilnya
  return res.json();
}

export default Home;
