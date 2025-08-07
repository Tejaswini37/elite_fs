// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [mcqs, setMcqs] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // 🔗 Replace this with your actual ngrok URL (copied from Colab)
      const response = await axios.post("https://22dd-34-91-197-222.ngrok-free.app/upload", formData);
      setMcqs(response.data.mcqs);
    } catch (error) {
      alert("Failed to upload or generate MCQs.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h2>📄 Upload PDF to Generate MCQs</h2>
      <input type="file" onChange={handleUpload} />
      {loading && <p>Generating MCQs... please wait.</p>}
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{mcqs}</pre>
    </div>
  );
}

export default App;
