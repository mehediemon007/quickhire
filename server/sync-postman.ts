import axios from 'axios';
import fs from 'fs';

async function sync() {
  const schema = fs.readFileSync('./swagger-output.json', 'utf8');

  try {
    await axios.put(
      `https://api.getpostman.com/apis/${process.env.POSTMAN_API_KEY}/specifications/${process.env.POSTMAN_SPEC_ID}`,
      { content: schema },
      { headers: { 'X-Api-Key': process.env.POSTMAN_API_KEY } }
    );
    console.log("🚀 Spec Hub Updated!");
  } catch (err) {
    console.error("❌ Sync Failed: Check your IDs and API Key");
  }
}

sync();