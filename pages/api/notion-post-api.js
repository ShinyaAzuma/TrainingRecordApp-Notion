import { Client } from '@notionhq/client';



export default function notionPostApi(req, res,handler) {
  console.log(JSON.parse(req.body))
const data = JSON.parse(req.body)
const databaseId =  process.env.NOTION_DATABASE_ID;
const hiduke = new Date(); 
const year = hiduke.getFullYear();
const month = hiduke.getMonth()+1;
const week = hiduke.getDay();
const day = hiduke.getDate();

const yobi = new Array("日","月","火","水","木","金","土");

const trainingDate = year+"年"+month+"月"+day+"日 "+yobi[week]+ "曜日"

const notion = new Client({ auth: process.env.NOTION_SECRET });
return async () => {
  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      "トレーニング日": {
        title: [
          {
            text: {
              content: trainingDate,
            },
          },
        ],
      },
      Weight: {
        number: Number(data.Weight),
      },
      Rep: {
        number: Number(data.Rep),
      },
      Set: {
        number: Number(data.Set),
      },
      Name: {
        select: {
          name:  data.name,
        },
      },
      "部位": {
        select: {
          name:  data.site,
        },
      },
      // Price: {
      //   number: 2.5,
      // },
    },
    // children: [
    //   {
    //     object: 'block',
    //     type: 'heading_2',
    //     heading_2: {
    //       rich_text: [
    //         {
    //           type: 'text',
    //           text: {
    //             content: 'Lacinato kale',
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     object: 'block',
    //     type: 'paragraph',
    //     paragraph: {
    //       rich_text: [
    //         {
    //           type: 'text',
    //           text: {
    //             content: 'Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.',
    //             link: {
    //               url: 'https://en.wikipedia.org/wiki/Lacinato_kale',
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ],
  });
  await handler(req,res)
};

}