// * Import the Express Package
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override');

// * Constructor of Express App
const app = express()
const fs = require('fs')

// * Override



// Middleware does something to the response object before it comes in or goes out. 
// It intercepts the request actions before it reaches the 
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// body-parser middleware makeks req.body work
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));




// Controllers Middleware
app.listen(8000, ()=>{
    console.log("omg rawr 🦕 x3")
})

app.get('/', (req,res)=>{
    res.render('home.ejs')
})

app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))



// // INDEX ROUTE
// app.get('/dinosaurs', (req,res)=>{
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)
//     res.render('index.ejs', {dinoData: dinoData})
//     console.log(dinoData)

// })

// // CREATE A NEW GET ROUTE

// app.get('/dinosaurs/new', (req, res) => {
//     res.render('new.ejs')
// })

// // CREATE A SHOW ROUTE/SHOW VIEW FOR DISPLAYING INDEXS

// app.get('/dinosaurs/:idx', (req, res)=> {
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)
//     // Get Array Index from Url Parameter. Need to use "req.params" to snatch it from the request
//     let dinoIndex = req.params.idx
//     console.log(dinoData[dinoIndex])
//     res.render('show.ejs', {myDino: dinoData[dinoIndex]})
// })

// // POST ROUTES
// app.post('/dinosaurs', (req,res) => {
//     // READ FILE
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)
//     // ADD NEW DINO TO dinoData
//     dinoData.push(req.body)
//     // Save Updated dinoData
//     fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
//     // redict to GET /dinosaurus (index)
//     res.redirect('/dinosaurs')


//     console.log(req.body)
// })

// METHOD OF GET ASSSUMES U WANNA SEE SOME SHIT

// METHOD OF POST INTENDS TO POST DATA TO DATABASE, AND ASSUMES THAT U DONT WANT THIS DATA ON THE FRONTEND AND REFRESHES PAGE

// PREHISTORIC CREATURES ROUTES


// GET ROUTES
// app.get('/prehistoric_creatures', (req,res)=>{
//     let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
//     let prehistoricData = JSON.parse(prehistoric_creatures)
//     res.render('index2.ejs', {prehistoricData: prehistoricData})
//     console.log(prehistoricData)

// })

// app.get('/prehistoric_creatures/new', (req, res) => {
//     res.render('new2.ejs')
// })

// app.get('/prehistoric_creatures/:idx', (req, res)=> {
//     let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
//     let prehistoricData = JSON.parse(prehistoric_creatures)
//     // Get Array Index from Url Parameter. Need to use "req.params" to snatch it from the request
//     let prehistoricIndex = req.params.idx
//     console.log(prehistoricData[prehistoricIndex])
//     res.render('show2.ejs', {myAnimal: prehistoricData[prehistoricIndex]})
// })


// // POST ROUTES

// app.post('/prehistoric_creatures', (req,res) => {
//     // READ FILE
//     let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
//     let prehistoricData = JSON.parse(prehistoric)

//     prehistoricData.push(req.body)

//     fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
//     res.redirect('/prehistoric_creatures')


//     console.log(req.body)
// })