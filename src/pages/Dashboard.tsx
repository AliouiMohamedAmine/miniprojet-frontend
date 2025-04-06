import React from 'react';
import { Users, Calendar, FileText, User as UserMd, Presentation as Prescription, Building, FlaskRound as Flask, CreditCard, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const services = [
    {
      title: 'Gestion des Patients',
      description: 'Gérer les informations et dossiers des patients',
      icon: Users,
      path: '/patients',
      color: 'bg-blue-500'
    },
    {
      title: 'Rendez-vous',
      description: 'Planifier et gérer les rendez-vous',
      icon: Calendar,
      path: '/rendezvous',
      color: 'bg-green-500'
    },
    {
      title: 'Dossiers Médicaux',
      description: 'Accéder aux dossiers médicaux des patients',
      icon: FileText,
      path: '/dossiers',
      color: 'bg-yellow-500'
    },
    {
      title: 'Médecins',
      description: 'Gérer les informations des médecins',
      icon: UserMd,
      path: '/medecins',
      color: 'bg-purple-500'
    },
    {
      title: 'Prescriptions',
      description: 'Gérer les prescriptions médicales',
      icon: Prescription,
      path: '/prescriptions',
      color: 'bg-red-500'
    },
    {
      title: 'Pharmacies',
      description: 'Accéder aux services de pharmacie',
      icon: Building,
      path: '/pharmacies',
      color: 'bg-indigo-500'
    },
    {
      title: 'Laboratoires',
      description: 'Gérer les résultats de laboratoire',
      icon: Flask,
      path: '/laboratoires',
      color: 'bg-pink-500'
    },
    {
      title: 'Facturation',
      description: 'Gérer la facturation et les paiements',
      icon: CreditCard,
      path: '/facturations',
      color: 'bg-orange-500'
    },
    {
      title: 'Notifications',
      description: 'Centre de notifications',
      icon: Bell,
      path: '/notifications',
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ title, description, icon: Icon, path, color }) => (
          <Link
            key={path}
            to={path}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${color}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <p className="mt-1 text-gray-600">{description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;