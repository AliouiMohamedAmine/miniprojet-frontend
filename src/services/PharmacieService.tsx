import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const pharmacySchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  address: z.string().min(5, 'L\'adresse est requise'),
  phone: z.string().min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres'),
});

type PharmacyForm = z.infer<typeof pharmacySchema>;

const mockPharmacies = [
  { id: 1, name: 'Pharmacie Centrale', address: '123 Rue Principale', phone: '0123456789' },
];

const PharmacyService = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pharmacies, setPharmacies] = useState(mockPharmacies);
  const [currentPage, setCurrentPage] = useState(1);
  const pharmaciesPerPage = 5;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PharmacyForm>({
    resolver: zodResolver(pharmacySchema),
  });

  const onSubmit = (data: PharmacyForm) => {
    setPharmacies([...pharmacies, { id: pharmacies.length + 1, ...data }]);
    setShowForm(false);
    reset();
  };

  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPharmacy = currentPage * pharmaciesPerPage;
  const indexOfFirstPharmacy = indexOfLastPharmacy - pharmaciesPerPage;
  const currentPharmacies = filteredPharmacies.slice(indexOfFirstPharmacy, indexOfLastPharmacy);
  const totalPages = Math.ceil(filteredPharmacies.length / pharmaciesPerPage);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Gestion des Pharmacies</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" /> Ajouter
        </button>
      </div>

      <input
        type="text"
        placeholder="Rechercher une pharmacie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register('name')}
            placeholder="Nom de la pharmacie"
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="text"
            {...register('address')}
            placeholder="Adresse"
            className="w-full p-2 border rounded"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

          <input
            type="tel"
            {...register('phone')}
            placeholder="Numéro de téléphone"
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                reset();
              }}
              className="px-4 py-2 border rounded"
            >
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Enregistrer</button>
          </div>
        </form>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Adresse</th>
              <th className="p-2 border">Téléphone</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPharmacies.map((pharmacy) => (
              <tr key={pharmacy.id} className="border">
                <td className="p-2 border">{pharmacy.name}</td>
                <td className="p-2 border">{pharmacy.address}</td>
                <td className="p-2 border">{pharmacy.phone}</td>
                <td className="p-2 border flex space-x-2">
                  <button className="text-blue-600 hover:underline">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:underline">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center mt-4">
        <p>Affichage de {indexOfFirstPharmacy + 1} à {Math.min(indexOfLastPharmacy, filteredPharmacies.length)} sur {filteredPharmacies.length} pharmacies</p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyService;
