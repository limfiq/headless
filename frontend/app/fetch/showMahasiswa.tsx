'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';

interface Mahasiswa {
  id: number;
  attributes: {
    NIM: string;
    Nama: string;
    angkatan: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
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
  const [selectedMahasiswa, setSelectedMahasiswa] = useState<Mahasiswa | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const handleShow = (mahasiswa: Mahasiswa) => {
    setSelectedMahasiswa(mahasiswa);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMahasiswa(null);
    setModalIsOpen(false);
  };

  return (
    <main>
      <h1 style={{ color: "blue" }}>Daftar Mahasiswa</h1>
      <ul>
        {data.map((mahasiswa) => (
          <li key={mahasiswa.id}>
            {mahasiswa.attributes.NIM} - {mahasiswa.attributes.Nama}
            <button onClick={() => handleShow(mahasiswa)}>Show</button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Mahasiswa Details"
      >
        {selectedMahasiswa && (
          <div>
            <h2>Mahasiswa Details</h2>
            <p>NIM: {selectedMahasiswa.attributes.NIM}</p>
            <p>Nama: {selectedMahasiswa.attributes.Nama}</p>
            <p>Angkatan: {selectedMahasiswa.attributes.angkatan}</p>
            {/* Add other details as needed */}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </main>
  );
}
