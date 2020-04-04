// const fs = require('fs');

// var students = '';
// fs.readdir("./db", (err, allFiles) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // console.log('Insid else out of foreach')
//       allFiles.forEach(file => {
//         let data = fs.readFileSync(`db/${file}`,'utf8');
//         // console.log(data)
//       })
//       for(let i = 0; i < allFiles.length; i++){
//         fs.readFile(
//           `./db/${allFiles[i]}`,
//           "utf8",
//           (err, data) => {
//             if (err) {
//               console.log(err);
//             } else {
//               var data1 = JSON.parse(data.toString())
//               students += `<tr><td>${data1.fields.name}</td><td>${data1.fields.age}</td><td>${data1.fields.department}</td><td>${data1.fields.Fees}</td><td>X</td></tr>`
//               // students += `<li>${data1.fields.name}</li>`
//             }
//           }
//         );
//       }
//     }
// });
// module.exports.students = students;

