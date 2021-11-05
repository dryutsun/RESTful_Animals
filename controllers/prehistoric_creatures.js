const express = require('express');

const router = express.Router();
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req,res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric_creatures)
    let typeFilter = req.query.typeFilter
    console.log(typeFilter)
    if(typeFilter) {
        prehistoricData = prehistoricData.filter((animal)=>{
            return animal.type.toLowerCase() === typeFilter.toLowerCase()
        })
    }
    res.render('prehistoric_creatures/index.ejs', {prehistoricData: prehistoricData})
    console.log(prehistoricData)

})

// CREATE A NEW GET ROUTE
router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

// ROUTE FOR EDITING
router.get('/edit/:idx', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric_creatures)

    res.render('prehistoric_creatures/edit.ejs', {animalId: req.params.idx, animal: prehistoricData[req.params.idx]})
})


// UPDATE AN ANIMAL
router.put('/:idx', (req,res)=> {
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric_creatures)
    // Reassign the name of an type fields of idno to be edited
    prehistoricData[req.params.idx].name = req.body.name
    prehistoricData[req.params.idx].type = req.body.type
    console.log(prehistoricData[req.params.idx].type)
    console.log(prehistoricData[req.params.idx].img_url)
    // save the editted dinosaur to the json file.
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    res.redirect('/prehistoric_creatures')

})

// CREATE A SHOW ROUTE/SHOW VIEW FOR DISPLAYING INDEXS

router.get('/:idx', (req, res)=> {
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric_creatures)
    // Get Array Index from Url Parameter. Need to use "req.params" to snatch it from the request
    let prehistoricIndex = req.params.idx
    console.log(prehistoricData[prehistoricIndex])
    res.render('prehistoric_creatures/show.ejs', {myAnimal: prehistoricData[prehistoricIndex]})
})


// POST ROUTES

router.post('/', (req,res) => {
    // READ FILE
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric)

    prehistoricData.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    res.redirect('/prehistoric_creatures')


    console.log(req.body)
})

// DELETE A DINO
router.delete('/:idx', (req,res) =>{
    // READ FILE
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric)
    let prehistoricIndex = req.params.idx
    prehistoricData.splice(prehistoricIndex, 1)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(prehistoricData))
    res.redirect('/prehistoric_creatures')
})





















module.exports = router;