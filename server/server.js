import next from "next";
import express from "express";

const app = next({dev: process.dev.NODE_ENV !== 'production'})
const handle = app.getRequestHandler()

app.prepare().then(()=>{
    const server = express()

    server.all('*', (req, res)=>{
        return handle(req,res)
    })

    server.listen(300, (err)=>{
        if (err) throw err
        console.log('Ready on Http://localhost:3000')
    })
})
