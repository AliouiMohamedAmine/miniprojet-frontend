import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const testSchema = z.object({
  patientName: z.string().min(2, 'Patient name is required'),
  testType: z.string().min(3, 'Test type is required'),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['pending', 'in progress', 'completed']),
  result: z.string().optional(),
});

type TestForm = z.infer<typeof testSchema>;

const mockTests = [
  {
    id: 1,
    patientName: 'Alice Smith',
    testType: 'Blood Test',
    date: '2025-04-01',
    status: 'completed',
    result: 'Normal',
  },
];

const LabService = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tests, setTests] = useState(mockTests);
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestForm>({
    resolver: zodResolver(testSchema),
  });

  const onSubmit = (data: TestForm) => {
    setTests([...tests, { id: tests.length + 1, ...data }]);
    setShowForm(false);
    reset();
  };

  const filteredTests = tests.filter(
    (test) =>
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(filteredTests.length / testsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Tests de Laboratoire</h1>
        <button onClick={() => setShowForm(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Test
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <input type="text" placeholder="Rechercher un test..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom du Patient</label>
              <input type="text" {...register('patientName')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              {errors.patientName && <p className="text-red-600 text-sm">{errors.patientName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type de Test</label>
              <input type="text" {...register('testType')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              {errors.testType && <p className="text-red-600 text-sm">{errors.testType.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" {...register('date')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Statut</label>
              <select {...register('status')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="pending">En attente</option>
                <option value="in progress">En cours</option>
                <option value="completed">Terminé</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => { setShowForm(false); reset(); }} className="px-4 py-2 border border-gray-300 rounded-md">
                Annuler
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
                Enregistrer
              </button>
            </div>
          </form>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                </tr>
              </thead>
              <tbody>
                {currentTests.map((test) => (
                  <tr key={test.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{test.patientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{test.testType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{test.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{test.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabService;
