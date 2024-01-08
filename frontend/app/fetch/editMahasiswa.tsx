// pages/editMahasiswa.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Mahasiswa {
  id: number;
  attributes: {
    nim: string;
    nama: string;
    angkatan: string;
  };
}

const EditMahasiswaPage = () => {
  const [formData, setFormData] = useState({
    nim: '',
    nama: '',
    angkatan: '',
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/mahasiswas/${id}`);
        const mahasiswaData = response.data.data as Mahasiswa;
        setFormData({
          nim: mahasiswaData.attributes.nim,
          nama: mahasiswaData.attributes.nama,
          angkatan: mahasiswaData.attributes.angkatan,
        });
      } catch (error) {
        console.error('Error fetching Mahasiswa:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:1337/api/mahasiswas/${id}`, {
        data: formData,
      });
      // Redirect to the Mahasiswa list page after successful submission
      router.push('/mahasiswa');
    } catch (error) {
      console.error('Error updating Mahasiswa:', error);
    }
  };

  return (
    <div>
      <h1>Edit Mahasiswa</h1>
      <form onSubmit={handleSubmit}>
        <label>
          NIM:
          <input type="text" name="nim" value={formData.nim} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nama:
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} />
        </label>
        <br />
        <label>
          Angkatan:
          <input type="text" name="angkatan" value={formData.angkatan} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Update Mahasiswa</button>
      </form>
    </div>
  );
};

export default EditMahasiswaPage;
