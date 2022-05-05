import { Client } from '@notionhq/client';

export default function handler(req, res) {
    const databaseId =  process.env.NOTION_DATABASE_ID;
    return new Promise((resolve, reject) => {
        const notion = new Client({ auth: process.env.NOTION_SECRET });
        const return_date = notion.databases.retrieve({ database_id: databaseId }).then(response => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
            resolve();
          })
          .catch(error => {
            res.json(error);
            res.status(405).end();
            return resolve(); //in case something goes wrong in the catch block (as vijay) commented
          });
      });
}
