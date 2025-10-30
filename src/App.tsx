import React from 'react';
import ClientOnboardingForm from './components/ClientOnboardingForm';

function App() {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', border: '1px solid #eee', borderRadius: 8 }}>
      <h1>FinTech CRM Demo</h1>
      <ClientOnboardingForm />
    </div>
  );
}

export default App;
