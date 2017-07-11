import fs from 'fs';
import path from 'path';

export default function configLoader() {
  const env = process.env.NODE_ENV || 'development';
  const filepath = path.resolve(__dirname, `./../../../config/${env}-config.json`);

  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}
