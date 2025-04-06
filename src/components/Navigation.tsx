import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Calendar, FileText, User as UserMd, Presentation as Prescription, Building, FlaskRound as Flask, CreditCard, Bell } from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { path: '/patients', icon: Users, label: 'Patients' },
    { path: '/rendezvous', icon: Calendar, label: 'Rendez-vous' },
    { path: '/dossiers', icon: FileText, label: 'Dossiers' },
    { path: '/medecins', icon: UserMd, label: 'Médecins' },
    { path: '/prescriptions', icon: Prescription, label: 'Prescriptions' },
    { path: '/pharmacies', icon: Building, label: 'Pharmacies' },
    { path: '/laboratoires', icon: Flask, label: 'Laboratoires' },
    { path: '/facturations', icon: CreditCard, label: 'Facturations' },
    { path: '/notifications', icon: Bell, label: 'Notifications' }
  ];

  return (
    <div className="flex space-x-4">
      {navItems.map(({ path, icon: Icon, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`
          }
        >
          <Icon className="h-4 w-4 mr-1" />
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;