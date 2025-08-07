// src/components/AllProfiles.js

import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/profiles')
      .then(res => setProfiles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          All Profiles
        </Typography>
        <List>
          {profiles.map((profile, index) => (
            <React.Fragment key={profile._id}>
              <ListItem 
                component={Link} 
                to={`/profiles/${profile._id}`}  // Note: this should match your route in App.js
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemText
                  primary={profile.name}
                  secondary={profile.email}
                />
              </ListItem>
              {index < profiles.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default AllProfiles;
