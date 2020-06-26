const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode =require('./utiles/geocode')
const forcast =require('./utiles/forcast')

const app = express()
const port =process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'SzzShaw'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'SzzShaw'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'SzzShaw'
    })
})

app.get('/weather', (req, res) => {
    const address=req.query.address
    if(!address){
        return res.send({
            error:'you must provide the address'
        })
    }
    geocode ( address,(error,{ latitude, longitude, location }={})=>{
        if(error){
           
            return res.send({error})
        }
    forcast( latitude, longitude,(error,forcastdata)=>{
        if(error){
        return res.send({error})
        }
        res.send({
            forcast: forcastdata ,
            location: location,
            address: address
        })
    })
    
    })
   
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
    }
   console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'sandeep',
        errormsg:'help artical  not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'sandeep',
        errormsg:'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})