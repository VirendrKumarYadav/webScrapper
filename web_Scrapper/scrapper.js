console.log("scarpper class");
const axios = require("axios");
// const request=require("request");
const cheerio = require("cheerio");
const xlsx = require("xlsx");
// ---------------------------------------------------------------------------
const producs = [];
const dummyData = [
  ["Name", "Age", "City"], // Header row
  ["John Doe", 30, "New York"],
  ["Jane Smith", 25, "Los Angeles"],
  ["Alice Johnson", 28, "Chicago"],
];
const getApiDataByURL = async () => {
  try {
   await axios
     .get(
       "https://www.bigbasket.com/?utm_source=google&utm_medium=cpc&utm_campaign=Brand-T2&gad_source=1&gclid=CjwKCAiA29auBhBxEiwAnKcSqvLKUxXX1bRyoiYXQ3FhpTW0V68MNv3JR1oCfc0brJZdUspkrr8-zhoCV6gQAvD_BwE"
     )
     .then((res) => {
       const $ = cheerio.load(res.data);

       const data = $("div.MultiItemCarousel___StyledDiv-sc-1gkzkai-0");
       
       console.log(data.find("ul li"));
       




      //  $("div.MultiItemCarousel___StyledDiv-sc-1gkzkai-0").each(
      //    (idx, ele) => {
      //      const data_1 = $(ele)
      //        .find("span.Pricing___StyledLabel2-sc-pldi2d-2")
      //        .attr("class");
      //      console.log(data_1);
      //    }
      //  );
     });
    // console.log(res);
    // const $ = cheerio.load(res.data);
    // const body = $("body");
    // // console.log(body);
    // const card =$("ul").find("li").length;
    //   // .each((idx, data) => {
    //   //   producs($(data.text()));
    //   //   console.log($(data).text() + "\n 1");
    //   // });
    // console.log(card);
  } catch (e) {
    console.log(e);
  }
};


// ---------------------------------------------
// request(
//   "https://www.bigbasket.com/?utm_source=google&utm_medium=cpc&utm_campaign=Brand-T2&gad_source=1&gclid=CjwKCAiA29auBhBxEiwAnKcSqvLKUxXX1bRyoiYXQ3FhpTW0V68MNv3JR1oCfc0brJZdUspkrr8-zhoCV6gQAvD_BwE",
//   (err,res,html)=>{

//     if (!err && res.statusCode == 200) {
//       const $ = cheerio.load(html);
//       const price = $('ul')
//       console.log(price);
//     }
//   }
// );

//-------------------------------------------
// console.log(producs);
const wbook = xlsx.utils.book_new();
const sheet = xlsx.utils.aoa_to_sheet(producs);
xlsx.utils.book_append_sheet(wbook, sheet, "Sheet2");
const filePath = "./output.xlsx";

// Write the workbook to a file
xlsx.writeFile(wbook, filePath);
getApiDataByURL();
