// const axios = require('axios');
// require('dotenv').config();
// const instance = axios.create({
//   baseURL: process.env.SUPABASE_URL + '/rest/v1',
//   timeout: 1000,
//   headers: {
//     apikey: process.env.SUPABASE_KEY,
//     Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
//   },
// });
// module.exports = instance; // Export instance


const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://fuqaqbkbkveaempzfpwg.supabase.co', // Update with your Supabase URL
  headers: {
    'apikey': process.env.SUPABASE_KEY,
    'Authorization': `Bearer ${process.env.SUPABASE_KEY}`,
    'Content-Type': 'application/json'
  }
});

module.exports = axiosInstance;
