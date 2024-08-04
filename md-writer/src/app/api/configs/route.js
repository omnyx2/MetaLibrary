import path from 'path';
import fs from 'fs-extra';

export default async function handler(req, res) {
    const configPath = path.join(process.cwd(), 'public', 'topics/test.json');
    try {
      const config = await fs.readJson(configPath);
      res.status(200).json(config);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load configuration' });
    }
  }
  