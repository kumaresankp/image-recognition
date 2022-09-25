var mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: "kumaresan",
    password: "kumaresan",
    database: "students"
})

con.connect((err) => {
    if (err) {
        console.log(err)
    } else { console.log("Connected!!!!") }
})
names = ["AAKASH S", "AANDAL S A", "AARTHI S", "ANEES PRIYANKA V", "ARAVIND S", "ARUL B", "ASHOK KUMAR K", "ASMA S", "BHARATHI P A", "DEEPA K", "DHANUSHRAJ D", "DHARANI R", "DHEVADHARSHINI M", "GAYATHIRI S", "GOWRISHANGARI R", "HARI PRASATH S", "HARIHARAN K", "HARIHARAN S", "HARINI V", "INDRANI M", "JANARTHANAN P", "JEEVA R", "JEEVESH P S", "JOHARA KANI S", "KARTHIK V", "KEERTHANA J", "KUMARESAN K P", "MAHESHWARI D", "MANIBHARATHI V S", "MANOJ M", "MATHESH KRISHNAN M", "MOHAMED ASICK A", "MOHAMED GANI M", "MOHAMMED ALI K", "MONESHWARAN S", "MURUGANANTHAM P", "MURUGESHWARI A", "NANDHAKUMAR P", "NAVEEN G", "NITHYASHRI B M", "NOORA K M", "PRAGATHI V", "PRAKASH M", "PRASANNA R", "RAHUL S", "ROOBIGA R", "ROOHI SHIFA M", "SARAVANAN K", "SATHYA A", "SHALINI K", "SHARMIKA R", "SHASHANK S", "SIVADHARANI M", "SOWMIYA P J", "SRIRAM R", "SUJITH V", "SURENDRAN V", "VASANTHKUMAR K", "VENKATESH B", "VISHAL K"]
var i = 0
for (i; i < names.length; ++i) {
    con.query("INSERT INTO names values (?,?)", [i + 1, names[i]])
}

// con.query("INSERT INTO sample(datascience) values(?)", 89)