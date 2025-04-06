import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const prescriptionSchema = z.object({
  patientName: z.string().min(2, 'Patient name is required'),
  doctorName: z.string().min(2, 'Doctor name is required'),
  medication: z.string().min(2, 'Medication is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  date: z.string().min(1, 'Date is required'),
});

type PrescriptionForm = z.infer<typeof prescriptionSchema>;

const mockPrescriptions = [
  {
    id: 1,
    patientName: 'John Doe',
    doctorName: 'Dr. Smith',
    medication: 'Paracetamol',
    dosage: '500mg',
    date: '2025-04-01',
  },
];

const PrescriptionService = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrescriptionForm>({
    resolver: zodResolver(prescriptionSchema),
  });

  const onSubmit = (data: PrescriptionForm) => {
    setPrescriptions([...prescriptions, { id: prescriptions.length + 1, ...data }]);
    setShowForm(false);
    reset();
  };

  const filteredPrescriptions = prescriptions.filter((p) =>
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPrescriptions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPrescriptions.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Prescriptions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" /> Nouvelle Prescription
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher une prescription..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
          </div>
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label>Nom du Patient</label>
                <input {...register('patientName')} className="w-full border rounded-md p-2" />
                {errors.patientName && <p className="text-red-600">{errors.patientName.message}</p>}
              </div>
              <div>
                <label>Nom du Médecin</label>
                <input {...register('doctorName')} className="w-full border rounded-md p-2" />
                {errors.doctorName && <p className="text-red-600">{errors.doctorName.message}</p>}
              </div>
              <div>
                <label>Médicament</label>
                <input {...register('medication')} className="w-full border rounded-md p-2" />
                {errors.medication && <p className="text-red-600">{errors.medication.message}</p>}
              </div>
              <div>
                <label>Dosage</label>
                <input {...register('dosage')} className="w-full border rounded-md p-2" />
                {errors.dosage && <p className="text-red-600">{errors.dosage.message}</p>}
              </div>
              <div>
                <label>Date</label>
                <input type="date" {...register('date')} className="w-full border rounded-md p-2" />
                {errors.date && <p className="text-red-600">{errors.date.message}</p>}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-md">
                Annuler
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
                Enregistrer
              </button>
            </div>
          </form>
        ) : (
          <table className="w-full border rounded-md">
            <thead>
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Médecin</th>
                <th className="p-3">Médicament</th>
                <th className="p-3">Dosage</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((p) => (
                <tr key={p.id}>
                  <td className="p-3">{p.patientName}</td>
                  <td className="p-3">{p.doctorName}</td>
                  <td className="p-3">{p.medication}</td>
                  <td className="p-3">{p.dosage}</td>
                  <td className="p-3">{p.date}</td>
                  <td className="p-3 flex space-x-2">
                    <button className="text-indigo-600"><Edit2 /></button>
                    <button className="text-red-600"><Trash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PrescriptionService;
