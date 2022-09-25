var express = require('express');
var port = process.env.PORT || 5000;
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const { spawn } = require('child_process')

// connection
const con = mysql.createConnection({
    host: 'localhost',
    user: "kumaresan",
    password: "kumaresan",
    database: "students"
})


// api middleware
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))
app.use('/images', express.static('images'))


// checking connectin
con.connect((err) => {
        if (err) {
            console.log(err)
        } else { console.log("Connected!!!!") }
    })
    // API ROUTES

app.get('/form', (req, res) => {
    res.sendFile(__dirname + "\\index.html");
})

app.post('/college', (req, res) => {
    var data = req.body;
    marks = [data.reg1, data.reg2, data.reg3, data.reg4, data.reg5, data.reg6, data.reg7, data.reg8, data.reg9, data.reg10, data.reg11, data.reg12, data.reg13, data.reg14, data.reg15, data.reg16, data.reg17, data.reg18, data.reg19, data.reg20, data.reg21, data.reg22, data.reg23, data.reg24, data.reg25, data.reg26, data.reg27, data.reg28, data.reg29, data.reg30, data.reg31, data.reg32, data.reg33, data.reg34, data.reg35, data.reg36, data.reg37, data.reg38, data.reg39, data.reg40, data.reg41, data.reg42, data.reg43, data.reg44, data.reg45, data.reg46, data.reg47, data.reg48, data.reg49, data.reg50, data.reg51, data.reg52, data.reg53, data.reg54, data.reg55, data.reg56, data.reg57, data.reg58, data.reg59, data.reg60]
    var course = data.course
    result = [];
    marks.forEach(element => {
        if (element !== '') {
            result.push(element)
        }

    });
    var i = 0;
    for (i; i < result.length; ++i) {
        mark = result[i];
        con.query(`insert into ${course} values(?,?)`, [i + 1, mark], function(err) { if (err) return console.log("Submitted!") })
    }

    res.sendFile(__dirname + "\\index.html");

    //
});


app.post('/pdf', (req, res) => {


    var i = 0;
    // var pdfDoc = new PDFDocument;
    // pdfDoc.pipe(fs.createWriteStream('Marks.pdf'));
    // pdfDoc.text("Names")
    for (i; i < 3; ++i) {
        con.query(`SELECT names.names,oops.oops,datastructure.datastructure,maths.maths,dpco.dpco,datascience.datascience FROM names JOIN oops ON names.reg = oops.reg JOIN datastructure ON names.reg = datastructure.reg JOIN maths ON names.reg = maths.reg JOIN dpco ON names.reg = dpco.reg JOIN datascience ON names.reg = datascience.reg WHERE names.reg = ${i+1};`, function(err, result) {
            if (err) {
                throw err;
            } else {
                fs.appendFile('marks.txt', `${result[0].names}               ${result[0].oops}	             ${result[0].datascience}           ${result[0].datastructure}               ${result[0].maths}	${result[0].dpco}\n`, 'utf-8', err => { if (err) throw err; })
            }
        })
    }











    // pdfDoc.text("Names      OOPS        datastructure   datascience     maths       dpco")
    const child = spawn('python pdf.py', [''], { shell: true });
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    console.log("Pdf Generated!");
    res.sendFile(__dirname + '\\sample.html')
})

app.get('/generatepdf', (req, res) => {
    con.query('truncate oops')
    con.query('truncate datastructure')
    con.query('truncate datascience')
    con.query('truncate maths')
    con.query('truncate dpco')
    res.sendFile(__dirname + '\\Marks1.pdf')
})






app.listen(5000, () => console.log('app is listening on port 5000.'));