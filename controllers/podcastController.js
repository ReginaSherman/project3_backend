const express = require('express')

const router = express.Router()

const Podcasts = require('../models/podcast')  

router.get('/', async (req, res, next) => {
    try {
        const podcasts = await Podcasts.find({})
        res.json(podcasts)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next)=>{
    try{
        const podcast = await Podcasts.findById(req.params.id)
        if(podcast){
            res.json(podcast)
        }else {
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next)=>{
    try{
        const newPodcast = await Podcasts.create(req.body)
        res.status(201).json(newPodcast)
    } catch(err){
        next(err)
    }
 
})

router.put('/:id', async (req, res, next)=>{
    try{
        const podcastToUpdate = await Podcasts.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        if (podcastToUpdate) {
            res.json(podcastToUpdate)
        } else{
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next)=>{
    try{
        const podcastToDelete = await Podcasts.findByIdAndDelete(
            req.params.id)
            if (podcastToDelete){
                res.sendStatus(204)
            }else{
                res.sendStatus(404)
            }
    }catch(err){
        next(err)
    }
})


module.exports = router