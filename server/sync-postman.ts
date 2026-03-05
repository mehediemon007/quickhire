import axios from 'axios';
import fs from 'fs';
import 'dotenv/config';

async function sync() {
    const { POSTMAN_SPEC_ID, POSTMAN_API_KEY } = process.env;
    
    const FILE_PATH = 'index.json'; 
    const schemaContent = fs.readFileSync('./swagger-output.json', 'utf8');

    try {
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
        console.error("Sync Failed:");
        if (err.response) {
            console.error(`Status: ${err.response.status}`);
            console.error(`Error:`, err.response.data.detail || err.response.data);
        } else {
            console.error(err.message);
        }
    }
}

sync();