const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json()) //access the data

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


app.get('/', (req, res)=> {
    //request contains all of the info of the HTTP request
    //response is used to define how the request is responded to
    res.send('<h1>Hello World!!</h1>')
})

app.get('/api/notes', (req, res)=> {
    res.json(notes) 
    //no need response.end(JSON.stringify(notes)) because transformation happens automatically with express
})

app.get('/api/notes/:id', (req,res) => {
    const id = Number(req.params.id)
    console.log(id, req.params)
    const note = notes.find(note =>{
    // console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        return note.id === id
    })
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})


const generateId = () => {
    const maxId = notes.length > 0 
    ? Math.max(...notes.map(note => note.id))
    : 0
    const note = req.body
    note.id = maxId + 1
}

app.post('/api/notes', (req, res) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    }

    notes = notes.concat(note)
    res.json(note)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
  app.use(unknownEndpoint)



const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on ${PORT}`);