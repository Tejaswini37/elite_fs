import React, { useState } from 'react';
import { TextField, Button, Stepper, Step, StepLabel, Container, Box } from '@mui/material';
import axios from 'axios';

const steps = ['Personal Info', 'Education Info', 'Interests', 'Achievements'];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    degree: '', institution: '', year: '',
    interests: '', achievements: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
    await axios.post('http://10.11.18.96:5000/api/profiles', formData);
    window.location.href = '/profiles';
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TextField fullWidth margin="normal" name="name" label="Name" value={formData.name} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="email" label="Email" value={formData.email} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="phone" label="Phone" value={formData.phone} onChange={handleChange} />
          </>
        );
      case 1:
        return (
          <>
            <TextField fullWidth margin="normal" name="degree" label="Degree" value={formData.degree} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="institution" label="Institution" value={formData.institution} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="year" label="Year" value={formData.year} onChange={handleChange} />
          </>
        );
      case 2:
        return (
          <TextField fullWidth margin="normal" name="interests" label="Interests (comma-separated)" value={formData.interests} onChange={handleChange} />
        );
      case 3:
        return (
          <TextField fullWidth margin="normal" name="achievements" label="Achievements (comma-separated)" value={formData.achievements} onChange={handleChange} />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>

      <Box mt={3}>
        {renderStep()}
        <Box mt={2}>
          {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          ) : (
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MultiStepForm;
