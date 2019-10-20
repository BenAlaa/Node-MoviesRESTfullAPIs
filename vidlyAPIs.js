/**
 * @author BenAlaa
 * 
 */



//// joi is third party libary using for validate requests
const Joi = require('@hapi/joi');
const express = require('express');
const app = express();
app.use(express.json());
const movies = [
    { id: 1, name: 'Fast and Furios8', genre: 'Action' },  
    { id: 2, name: 'IT',               genre: 'Horror' },  
    { id: 3, name: 'Sunday Remember',  genre: 'Romance' },  
  ];


//// Get All Movies /////
app.get('/api/movies/',(req,res)=>{
    res.send(movies);
});

/// Get one Movie ////
app.get('/api/movies/:id',(req,res)=>{
    const movie =movies.find(m=>m.id === req.body.id);
    if(!movie) return res.status(404).send('The Movie with the given id not Found! .....');
    res.send(movie);
})

/// Post movie ////
app.post('/api/movies/',(req,res)=> {
    // Validate
    // If not valide, return 400- Bad Requst
    const {error}=validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie={
        id: movies.length+1,
        name: req.body.name,
        genre:req.body.genre
    };

    movies.push(movie);
    res.send(movies);
});


/// Put Update one movie
app.put('/api/movies/:id',(req,res)=>{
    // Look up the course
    // If not existing , return 404
    const movie = movies.find(m=>m.id === req.body.id);
    if(!movie) return res.status(404).send('The Movie with the given id not Found! .....'); 

    // Validate
    // If not valide, return 400- Bad Requst
    const {error} = validateMovie(movie);
    if(error) return res.status(400).send(error.details[0].message);

    movie.name=req.body.name;
    movie.genre=req.body.genre;
    res.send(movies);
})


/// Delete One Movie By id ////
app.delete('/api/movies/:id',(req,res)=>{
    // Look up the course
    // If not existing , return 404
    const movie = movies.find(m=>m.id === req.body.id);
    if(!movie) return res.status(404).send('The Movie with the given id not Found! .....');

    const index = movies.indexOf(req.body);
    movies.splice(index,1);
    res.send(movies);
})
function validateMovie(movie){
    const schema=Joi.object({
        name: Joi.string().min(4).require(),
        genre: Joi.string().min(4).require()
    })
    return schema.validate();

}

const port = process.env.PORT || 5000
app.listen(port,()=>console.log(`Listening on port ${port}.....`));
