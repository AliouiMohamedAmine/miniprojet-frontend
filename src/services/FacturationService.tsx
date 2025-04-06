import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const factureSchema = z.object({
  reference: z.string().min(3, 'Référence requise'),
  date: z.string().min(1, 'Date requise'),
  montant: z.number().min(1, 'Montant invalide'),
  statut: z.enum(['payée', 'impayée', 'en attente']),
  description: z.string().optional(),
});

type FactureForm = z.infer<typeof factureSchema>;

const mockFactures = [
  {
    id: 1,
    reference: 'FAC-001',
    date: '2025-04-01',
    montant: 120.5,
    statut: 'payée',
    description: 'Consultation générale',
  },
];

const FacturationService = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [factures, setFactures] = useState(mockFactures);
  const [currentPage, setCurrentPage] = useState(1);
  const facturesPerPage = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FactureForm>({
    resolver: zodResolver(factureSchema),
  });

  const onSubmit = (data: FactureForm) => {
    console.log('Facture ajoutée:', data);
    setFactures([...factures, { id: factures.length + 1, ...data }]);
    setShowForm(false);
    reset();
  };

  const filteredFactures = factures.filter((facture) =>
    facture.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastFacture = currentPage * facturesPerPage;
  const indexOfFirstFacture = indexOfLastFacture - facturesPerPage;
  const currentFactures = filteredFactures.slice(indexOfFirstFacture, indexOfLastFacture);
  const totalPages = Math.ceil(filteredFactures.length / facturesPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Factures</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" /> Nouvelle Facture
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher une facture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label>Référence</label>
              <input type="text" {...register('reference')} className="w-full" />
              {errors.reference && <p className="text-red-600">{errors.reference.message}</p>}
            </div>
            <div>
              <label>Date</label>
              <input type="date" {...register('date')} className="w-full" />
              {errors.date && <p className="text-red-600">{errors.date.message}</p>}
            </div>
            <div>
              <label>Montant</label>
              <input type="number" step="0.01" {...register('montant')} className="w-full" />
              {errors.montant && <p className="text-red-600">{errors.montant.message}</p>}
            </div>
            <div>
              <label>Statut</label>
              <select {...register('statut')} className="w-full">
                <option value="payée">Payée</option>
                <option value="impayée">Impayée</option>
                <option value="en attente">En attente</option>
              </select>
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">Enregistrer</button>
          </form>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFactures.map((facture) => (
                <tr key={facture.id}>
                  <td>{facture.reference}</td>
                  <td>{facture.date}</td>
                  <td>{facture.montant} €</td>
                  <td>{facture.statut}</td>
                  <td>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
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
        )}
      </div>
    </div>
  );
};

export default FacturationService;
