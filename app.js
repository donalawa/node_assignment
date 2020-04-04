const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const events = require('events');

const eventEmitter = new events.EventEmitter();

eventEmitter.once('register_complete',function(){
  console.log('New student registered')
})



var students = '';
fs.readdir("./db", (err, allFiles) => {
    if (err) {
      console.log(err);
    } else {
      // console.log('Insid else out of foreach')
      allFiles.forEach(file => {
        let data = fs.readFileSync(`db/${file}`,'utf8');
        // console.log(data)
      })
      for(let i = 0; i < allFiles.length; i++){
        fs.readFile(
          `./db/${allFiles[i]}`,
          "utf8",
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              var data1 = JSON.parse(data)
              students += `<tr><td>${data1.fields.name}</td><td>${data1.fields.age}</td><td>${data1.fields.department}</td><td>${data1.fields.Fees}</td><td>X</td></tr>`
            }
          }
        );
      }
    }
});


const server = http.createServer((req, res) => {
  if (req.url === "/api/upload" && req.method.toLowerCase() === "post") {
    // parse a file upload
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, image) => {
      fs.writeFile(
        `./db/${fields.name}.txt`,
        JSON.stringify({ fields,image }, null, 2),
        err => {
          if (err) {
            console.log(err);
          } else {
            eventEmitter.emit('register_complete')
            console.log('Event Occur')
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
  // var myReadStream = fs.createReadStream(__dirname + "/index.html", "utf8");
  // myReadStream.pipe(res);
  return res.end(`<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/style.css" />
    <title>Assignment</title>

    <style>
      .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }
      .form-control {
        display: block;
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }

      .form-group {
        margin-bottom: 1rem;
      }

      .row {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
      }

      .col {
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
        max-width: 100%;
      }

      .btn {
        display: inline-block;
        font-weight: 400;
        color: #212529;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }

      .table {
        width: 100%;
        margin-bottom: 1rem;
        color: #212529;
      }

      .table th,
      .table td {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
      }

      .table thead th {
        vertical-align: bottom;
        border-bottom: 2px solid #dee2e6;
      }

      .table tbody + tbody {
        border-top: 2px solid #dee2e6;
      }

      .btn:hover {
        cursor: pointer;
      }
      .btn-success {
        color: #fff;
        background-color: #28a745;
        border-color: #28a745;
      }

      .btn-success:hover {
        color: #fff;
        background-color: #218838;
        border-color: #1e7e34;
      }

      .btn-outline-secondary {
        color: #6c757d;
        border-color: #6c757d;
      }
      .center {
        text-align: center;
      }
      .btn-outline-secondary:hover {
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
      }

      .btn-outline-danger {
        color: #dc3545;
        border-color: #dc3545;
      }

      .btn-outline-danger:hover {
        color: #fff;
        background-color: #dc3545;
        border-color: #dc3545;
      }
    </style>
  </head>
  <body>
    <h1>Register System</h1>
    <div class="row">
      <div class="col">
        <div class="container">
          <form
            action="/api/upload"
            enctype="multipart/form-data"
            method="post"
          >
            <div class="form-group">
              Name: <input type="text" class="form-control" name="name" />
            </div>
            <div class="form-group">
              Age: <input type="text" class="form-control" name="age" />
            </div>
            <div class="form-group">
              Department:
              <input type="text" class="form-control" name="department" />
            </div>
            <div class="form-group">
              School Fees:
              <input type="number" class="form-control" name="Fees" />
            </div>
            <div class="form-group">
              Photo:
              <input
                type="file"
                class="form-control"
                name="multipleFiles"
                multiple="multiple"
              />
            </div>
            <input
              class="btn btn-outline-secondary"
              type="submit"
              value="Register"
            />
          </form>
        </div>
      </div>
      <div class="col">
        <div class="container data">
          <table class="table table-hover">
            <thead>
              <th>FullNames</th>
              <th>Age</th>
              <th>Department</th>
              <th>Fees</th>
              <th></th>
            </thead>
            <tbody class="center">
                ${students}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
</html>
`)

});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080/ ...");
});
