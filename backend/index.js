// Backend
let express = require('express')
let bodyParser = require('body-parser')
let router = express.Router()
let cors = require('cors')
let app = express()
app.use(cors());

app.use('/api', bodyParser.json(), router);   
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [{
    'no':0,'name':'suraiya','surname': 'baring','id': '5735512165','Major':'CoE','GPA':'2.10'},
    {'no':1,'name':'chalit','surname': 'suporntawee','id': '5735512168','Major':'CoE','GPA':'2.00'}

];
router.route('/students')
   // get all students
   .get( (req, res) =>  res.json(students) ) 

   // insert a new student
   .post( (req, res)=> {
       let student = {};
       student.no =  students[students.length-1].no+1;
       student.name = req.body.name
       student.surname = req.body.surname
       student.id= req.body.id
       student.Major = req.body.Major
       student.GPA = req.body.GPA
       students.push(student);
       res.json( {message: 'students created!'} )
   })

   router.route('/students/:student_no')
   // get a student
   .get ( (req,res) => {
        let no = req.params.student_no
        let index = students.findIndex( student => (student.no === +no) )
        res.json(students[index])                   
    }) 
 // Update a student
    .put ( (req,res) => {                              
        let no = req.params.student_no
        let index = students.findIndex( student => (student.no === +no) )
        students[index].name = req.body.name;   
        students[index].surname = req.body.surname;   
        students[index].id = req.body.id;   
        students[index].Major = req.body.Major;   
        students[index].GPA = req.body.GPA; 
          
        res.json({ message: 'student updated!' + req.params.student_no});
    })
// Delete a student
    .delete ( (req,res) => {                   
        // delete     students[req.params.student_id]
        let no = req.params.student_no
        let index = students.findIndex( student => student.no === +no  )
        students.splice(index,1) 
        res.json({ message: 'student deleted: ' + req.params.student_no});
    })
 

app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(80, () => { console.log('Server is running')})