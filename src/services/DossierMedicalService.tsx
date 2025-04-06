import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const medicalHistorySchema = z.object({
  patientId: z.number(),
  diagnosis: z.string().min(5, 'Diagnosis is required'),
  treatment: z.string().min(5, 'Treatment is required'),
  date: z.string().min(1, 'Date is required'),
});

type MedicalHistoryForm = z.infer<typeof medicalHistorySchema>;

const mockMedicalHistories = [
  {
    id: 1,
    patientId: 1,
    diagnosis: 'Hypertension',
    treatment: 'Medication for blood pressure',
    date: '2025-03-15',
  },
  // Add more mock medical histories here
];

const MedicalHistoryService = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [medicalHistories, setMedicalHistories] = useState(mockMedicalHistories);
  const [currentPage, setCurrentPage] = useState(1);
  const medicalHistoriesPerPage = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MedicalHistoryForm>({
    resolver: zodResolver(medicalHistorySchema),
  });

  const onSubmit = (data: MedicalHistoryForm) => {
    // TODO: Implement API call to save medical history
    console.log('Form submitted:', data);
    setMedicalHistories([
      ...medicalHistories,
      { id: medicalHistories.length + 1, ...data },
    ]);
    setShowForm(false);
    reset();
  };

  const filteredMedicalHistories = medicalHistories.filter(
    (history) =>
      history.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      history.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastHistory = currentPage * medicalHistoriesPerPage;
  const indexOfFirstHistory = indexOfLastHistory - medicalHistoriesPerPage;
  const currentMedicalHistories = filteredMedicalHistories.slice(indexOfFirstHistory, indexOfLastHistory);
  const totalPages = Math.ceil(filteredMedicalHistories.length / medicalHistoriesPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Dossiers Médicaux</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Dossier Médical
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher un dossier médical..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient ID</label>
                <input
                  type="number"
                  {...register('patientId')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.patientId && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Diagnostique</label>
                <input
                  type="text"
                  {...register('diagnosis')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.diagnosis && (
                  <p className="mt-1 text-sm text-red-600">{errors.diagnosis.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Traitement</label>
                <input
                  type="text"
                  {...register('treatment')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.treatment && (
                  <p className="mt-1 text-sm text-red-600">{errors.treatment.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  {...register('date')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Enregistrer
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient ID
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diagnostique
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Traitement
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMedicalHistories.map((history) => (
                    <tr key={history.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{history.patientId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{history.diagnosis}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{history.treatment}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{history.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Affichage de {indexOfFirstHistory + 1} à{' '}
                {Math.min(indexOfLastHistory, filteredMedicalHistories.length)} sur{' '}
                {filteredMedicalHistories.length} dossiers
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalHistoryService;
