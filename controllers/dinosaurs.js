const express = require('express');

const router = express.Router();
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    console.log(dinoData)
    res.render('dinosaurs/index.ejs', {dinoData: dinoData})

})

// CREATE A NEW GET ROUTE
router.get('/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})



// ROUTE FOR EDITING
router.get('/edit/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    res.render('dinosaurs/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})


// UPDATE A DINO
router.put('/:idx', (req,res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // Reassign the name of an type fields of idno to be edited
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type
    // save the editted dinosaur to the json file.
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')

})

// CREATE A SHOW ROUTE/SHOW VIEW FOR DISPLAYING INDEXS

router.get('/:idx', (req, res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // Get Array Index from Url Parameter. Need to use "req.params" to snatch it from the request
    let dinoIndex = req.params.idx
    console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// POST ROUTES
router.post('/', (req,res) => {
    // READ FILE
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // ADD NEW DINO TO dinoData
    dinoData.push(req.body)
    // Save Updated dinoData
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redict to GET /dinosaurus (index)
    res.redirect('/dinosaurs')


    console.log(req.body)
})


// DELETE A DINO
router.delete('/:idx', (req,res) =>{
    // READ FILE
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    dinoData.splice(dinoIndex, 1)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})








module.exports = router;