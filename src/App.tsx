import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import ProfileForm from './components/ProfileForm';
import ProfileDisplay from './components/ProfileDisplay';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/profile" replace />} />
            <Route path="profile-form" element={<ProfileForm />} />
            <Route path="profile" element={<ProfileDisplay />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;