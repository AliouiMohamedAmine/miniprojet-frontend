import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PatientService from './services/PatientService';
import RendezvousService from './services/RendezvousService';
import DossierMedicalService from './services/DossierMedicalService';
import MedecinService from './services/MedecinService';
import PrescriptionService from './services/PrescriptionService';
import PharmacieService from './services/PharmacieService';
import LaboratoireService from './services/LaboratoireService';
import FacturationService from './services/FacturationService';
import NotificationService from './services/NotificationService';
import Navigation from './components/Navigation';

function App() {
  // TODO: Implement proper auth state management
  const isAuthenticated = true;

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">MyHeart</span>
              </div>
              {isAuthenticated && <Navigation />}
            </div>
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/patients/*"
              element={
                isAuthenticated ? <PatientService /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/rendezvous/*"
              element={
                isAuthenticated ? <RendezvousService /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/dossiers/*"
              element={
                isAuthenticated ? <DossierMedicalService /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/medecins/*"
              element={
                isAuthenticated ? <MedecinService /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/prescriptions/*"
              element={
                isAuthenticated ? <PrescriptionService /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/pharmacies/*"
              element={
                isAuthenticated ? <PharmacieService /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/laboratoires/*"
              element={
                isAuthenticated ? <LaboratoireService /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/facturations/*"
              element={
                isAuthenticated ? <FacturationService /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/notifications/*"
              element={
                isAuthenticated ? <NotificationService /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;