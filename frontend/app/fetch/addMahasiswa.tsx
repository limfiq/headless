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

async function createMahasiswa(newMahasiswa: Mahasiswa): Promise<void> {
  try {
    await axios.post('http://localhost:1337/api/mahasiswas', {
      data: {
        attributes: newMahasiswa.attributes,
      },
    });
  } catch (error) {
    throw new Error("Gagal Menambahkan Mahasiswa");
  }
}

export default function Page() {
  const [data, setData] = useState<Mahasiswa[]>([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState<Mahasiswa | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newMahasiswa, setNewMahasiswa] = useState({
    NIM: "",
    Nama: "",
    angkatan: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedData = await getData();
      setData(fetchedData || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleShow = (mahasiswa: Mahasiswa) => {
    setSelectedMahasiswa(mahasiswa);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMahasiswa(null);
    setModalIsOpen(false);
  };

  const handleCreate = async () => {
    try {
      //await createMahasiswa({
        //id: 0, // You can set a temporary ID or handle it on the server side
       // attributes: newMahasiswa,
      //});
      setModalIsOpen(false);
      setNewMahasiswa({ NIM: "", Nama: "", angkatan: "" });
      fetchData(); // Refresh the data after creating a new Mahasiswa
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMahasiswa((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main>
      <h1 style={{ color: "blue" }}>Daftar Mahasiswa</h1>
      <button onClick={() => setModalIsOpen(true)}>Tambah Mahasiswa</button>

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
        <div>
          <h2>Tambah Mahasiswa</h2>
          <form>
            <label>
              NIM:
              <input type="text" name="NIM" value={newMahasiswa.NIM} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Nama:
              <input type="text" name="Nama" value={newMahasiswa.Nama} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Angkatan:
              <input type="text" name="angkatan" value={newMahasiswa.angkatan} onChange={handleInputChange} />
            </label>
            <br />
            <button type="button" onClick={handleCreate}>Simpan</button>
            <button type="button" onClick={closeModal}>Batal</button>
          </form>
        </div>
      </Modal>
    </main>
  );
}
