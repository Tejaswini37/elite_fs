import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://10.11.18.96:5000/api/profiles/${id}`).then(res => setProfile(res.data));
  }, [id]);

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4">{profile.name}</Typography>
      <Box mt={2}>
        <Typography>Email: {profile.email}</Typography>
        <Typography>Phone: {profile.phone}</Typography>
        <Typography>Degree: {profile.degree}</Typography>
        <Typography>Institution: {profile.institution}</Typography>
        <Typography>Year: {profile.year}</Typography>
        <Typography>Interests: {profile.interests.join(', ')}</Typography>
        <Typography>Achievements: {profile.achievements.join(', ')}</Typography>
      </Box>
    </Container>
  );
};

export default ProfileDetail;
