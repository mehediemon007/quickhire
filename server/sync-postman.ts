import axios from 'axios';
import fs from 'fs';
import 'dotenv/config';

async function sync() {
    const { POSTMAN_SPEC_ID, POSTMAN_API_KEY } = process.env;
    
    // According to your GET result, your root file is 'index.json'
    const FILE_PATH = 'index.json'; 
    const schemaContent = fs.readFileSync('./swagger-output.json', 'utf8');

    try {
        // Postman v12 Spec Hub Endpoint
        const url = `https://api.getpostman.com/specs/${POSTMAN_SPEC_ID}/files/${FILE_PATH}`;

        console.log(`🔄 Syncing swagger to Spec Hub (${FILE_PATH})...`);

        const response = await axios.patch(
            url,
            { content: schemaContent },
            {
                headers: {
                    'X-Api-Key': POSTMAN_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("🚀 Success! Spec Hub updated.");
        console.log("New Update Timestamp:", response.data.updatedAt);
    } catch (err: any) {
        console.error("❌ Sync Failed:");
        if (err.response) {
            console.error(`Status: ${err.response.status}`);
            // Log the 'detail' field from the Postman error response
            console.error(`Error:`, err.response.data.detail || err.response.data);
        } else {
            console.error(err.message);
        }
    }
}

sync();