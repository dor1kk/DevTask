const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using promise-based API
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
}));

const pool = mysql.createPool({
  host: 'mysql',
  user: 'my_user',
  password: 'my_password',
  database: 'my_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(bodyParser.json());


// API endpoint to fetch bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to insert a booking
app.post('/api/bookings', async (req, res) => {
  const { service, doctor, startTime, endTime, date } = req.body;
  const insertQuery = 'INSERT INTO bookings (service, doctor_name, start_time, end_time, date) VALUES (?, ?, ?, ?, ?)';

  try {
    await pool.query(insertQuery, [service, doctor, startTime, endTime, date]);
    res.status(201).send('Booking inserted successfully');
  } catch (error) {
    console.error('Error inserting booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to fetch a single booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).send('Booking not found');
    }
    
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to update a booking by ID
app.put('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { service, doctor, startTime, endTime, date } = req.body;
  
  const updateQuery = 'UPDATE bookings SET service = ?, doctor_name = ?, start_time = ?, end_time = ?, date = ? WHERE id = ?';

  try {
    const [result] = await pool.query(updateQuery, [service, doctor, startTime, endTime, date, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).send('Booking not found');
    }
    
    res.status(200).send('Booking updated successfully');
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to delete a booking by ID
app.delete('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await pool.query('DELETE FROM bookings WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).send('Booking not found');
    }
    
    res.status(200).send('Booking deleted successfully');
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
