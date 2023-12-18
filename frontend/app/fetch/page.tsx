'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";

interface Mahasiswa {
  id: number;
  attributes: {
    NIM: string;
    Nama: string;
    angkatan: string;
  };
}

async function getData(): Promise<Mahasiswa[]> {
  try {
    const response = await axios.get('http://localhost:1337/api/mahasiswas');
    return response.data.data as Mahasiswa[];
  } catch (error) {
    throw new Error("Gagal Mendapat Data");
  }
}

export default function Page() {
  const [data, setData] = useState<Mahasiswa[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getData();
        setData(fetchedData || []);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  //button handle
  const handleShow = (mahasiswa: Mahasiswa) => {
    <Link href="/addMahasiswa">Fetch</Link>
    // alert(`Showing Mahasiswa: ${mahasiswa.attributes.NIM} - ${mahasiswa.attributes.Nama}`);
  };

  const handleEdit = (mahasiswa: Mahasiswa) => {
    alert(`Editing Mahasiswa: ${mahasiswa.attributes.NIM} - ${mahasiswa.attributes.Nama}`);
  };

  const handleDelete = (mahasiswa: Mahasiswa) => {
    alert(`Deleting Mahasiswa: ${mahasiswa.attributes.NIM} - ${mahasiswa.attributes.Nama}`);
    // Implement your delete logic here
  };

  return (
    <main>
      <h1>Daftar Mahasiswa</h1>
      <button className="btn btn-green">Tambah Data</button>
      <table className="table-auto border-collapse border-2 border-gray-500">
        <thead>
          <tr>
            <th>No</th>
            <th>NIM</th>
            <th>Nama Lengkap</th>
            <th>Angkatan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.attributes.NIM}</td>
              <td>{item.attributes.Nama}</td>
              <td>{item.attributes.angkatan}</td>
              <td>
                <button className="btn btn-blue" onClick={() => handleShow(item)}>Show</button>
            <button className="btn btn-yellow" onClick={() => handleEdit(item)}>Edit</button>
            <button className="btn btn-red" onClick={() => handleDelete(item)}>Delete</button>
          
          
              </td>
              
            </tr>
          ))}
        </tbody>
      
      </table>
      <h1 style={{ color: "blue" }}>Daftar Mahasiswa</h1>
      <ul>
        {data.map((mahasiswa) => (
          <li key={mahasiswa.id}>{mahasiswa.attributes.NIM}</li>
        ))}
      </ul>
    </main>
  );
}
