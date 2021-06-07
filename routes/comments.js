const router = require('express').Router();
const user = require('../models/user.js');
const commentsRepo = require('../respositories/users.js');
const auth = require('../middleware/auth.js');

/* GET comments listing. */
router.get('/all', function(req, res, next) {
    commentsRepo.getAllComments()
      .then((comments) => res.status(200).json(comments))
      .catch(err => console.log(err));
  });
  
  router.get('/', async function(req, res) {
    try {
      let offset=parseInt(req.query.offset);
      let limit=parseInt(req.query.limit);
      res.send(await commentsRepo.getComments(offset,limit));
    } catch (err) {
      console.error(`Error`, err);
    }
  });
  
  router.get('/:id', async function(req, res) {
    try {
      let id=req.params.id;
      res.send(await commentsRepo.getComment(id));
    } catch (err) {
      console.error(`Error`, err);
    }
  });
  
 
  
  router.get('/article/:id', async function(req, res) {
    try {
        let id=req.params.id;
        res.send(await commentsRepo.getCommentByArticleId(id));
    } catch (err) {
      console.error(`Error`, err);
    }
  });

  router.post('/add', auth, (req, res) => {
    const {content, ArticleId} = req.body;
  
     const NewComment = {
                content,
                ArticleId,
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            
              commentsRepo.addUser(NewComment);
              res.status(200).redirect("http://localhost:3000/");
  })
  
  router.post('/:id', auth, (req, res) => {
    commentsRepo.updateComment(req.params.id, req.body);
    res.status(200).redirect("http://localhost:3000/");
  })
  
  
  router.delete('/:id', auth, (req, res) => {
    commentsRepo.deleteComment(req.params.id);
    res.status(200).redirect("http://localhost:3000/");
  })
  
  
  
  module.exports = router;