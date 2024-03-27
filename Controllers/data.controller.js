const fetch  = require('node-fetch');

const getfetchdata = async (req, res) => {

    try {
        // Fetch all data from the public API
        const response = await fetch('https://api.publicapis.org/entries');
        const data = await response.json();
    
        // Send the fetched data as the API response
        res.json(data);
      } catch (error) {
        // Handle errors and send appropriate response
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


const customSlice = (data, limit) => {
    if (limit && limit > 0) {
        return data.slice(0, limit);
    }
    return data;
};
const getfetchFilterdata = async (req, res) => {
    try {
        const { category, limit } = req.query;
        let apiUrl = 'https://api.publicapis.org/entries';
    
        if (category) {
            apiUrl += `?category=${category}`;
        }
    
        console.log('API URL:', apiUrl); // Log the constructed API URL
    
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status} ${response.statusText}`);
        }
    
        let data = await response.json();
        
        // Custom slicing based on the specified limit
        const limitedData = customSlice(data.entries, limit);
    
        res.json({ count: limitedData.length, entries: limitedData });
    } catch (error) {
        console.error('Error fetching filtered data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


  
module.exports= { getfetchdata , getfetchFilterdata }