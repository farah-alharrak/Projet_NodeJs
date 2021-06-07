const router = require('express').Router();
const user = require('../models/user.js');
const tagsRepo = require('../respositories/users.js');
const auth = require('../middleware/auth.js');


/* GET comments listing. */

router.get('/', async function(req, res) {
    tagsRepo.getTags(parseInt(req.query.offset), parseInt(req.query.limit))
      .then((Tags) => res.status(200).json(Tags))
      .catch(err => console.log(err));
  })

  router.get('/all', async function(req, res, next) {
    try {
      res.send(await tagsRepo.getAllTags(offset,limit));
    } catch (err) {
      console.error(`Error`, err);
    }
  });

  router.get('/:id', async function(req, res) {
    try {
      let id=req.params.id;
      res.send(await tagsRepo.getTag(id));
    } catch (err) {
      console.error(`Error`, err);
    }
  });

  router.post('/add', auth, (req, res) => {
    const {name} = req.body;
  
              const NvTag = {
                name,
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            
              tagRepo.addUser(NvTag);
              res.status(200).redirect("http://localhost:3000/");
  })
  
  router.post('/:id', auth, (req, res) => {
    tagsRepo.updateTag(req.params.id, req.body);
    res.status(200).redirect("http://localhost:3000/");
  })
  
  
  router.delete('/:id', auth, (req, res) => {
    tagsRepo.deleteTag(req.params.id);
    res.status(200).redirect("http://localhost:3000/");
  })    

  

  module.exports = router;