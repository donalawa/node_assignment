const http = require("http");
const fs = require("fs");
const formidable = require("formidable");

var allStudents = [];
const server = http.createServer((req, res) => {
  if (req.url === "/api/upload" && req.method.toLowerCase() === "post") {
    // parse a file upload
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      fs.writeFile(
        `./db/${fields.name}.txt`,
        JSON.stringify({ fields }, null, 2),
        err => {
          if (err) {
            console.log(err);
          } else {
            // fs.readFile(`./db/${fields.name}.txt`,'utf8',(err,data)=>{
            //     if(err){
            //         console.log(err)
            //     }else {
            //         console.log(data)
            //     }
            // })
          }
        }
      );
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  

  // show a file upload form
  res.writeHead(200, { "Content-Type": "text/html" });
  var myReadStream = fs.createReadStream(__dirname + "/index.html", "utf8");
  myReadStream.pipe(res);
  fs.readdir("./db", (err, allFiles) => {
    if (err) {
      console.log(err);
    } else {
      allFiles.forEach(file => {
        fs.readFile(
          `./db/${file}`,
          "utf8",
          (err, data) => {
            if (err) {
              console.log(err);
            } 
          }
        );
      });
    }
  });
});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080/ ...");
});
