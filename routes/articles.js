const router = require('express').Router();
const user = require('../models/user.js');
const articlesRepo = require('../respositories/articles.js');
const auth = require('../middleware/auth.js');

/* GET articles listing. */
router.get('/all', function(req, res, next) {
      articlesRepo.getAllArticles()
      .then((articles) => res.status(200).json(articles))
      .catch(err => console.log(err));
  });
  
  router.get('/', async function(req, res) {
    try {
      let offset=parseInt(req.query.offset);
      let limit=parseInt(req.query.limit);
      res.send(await articlesRepo.getAllArticles(offset,limit));
    } catch (err) {
      console.error(`Error`, err);
      
    }
  });
  
  router.get('/:id', async function(req, res) {
    try {
      let id=req.params.id;
      res.send(await articlesRepo.getArticle(id));
    } catch (err) {
      console.error(`Error: `, err);
      
    }
  });
  
  router.get('/title/:title', async function(req, res) {
    try {
      let title=req.params.title;
      res.send(await articlesRepo.getArticlesByTitle(title));
    } catch (err) {
      console.error(`Error: `, err);
    }
  });
  
  router.get('/user/:userId', async function(req, res) {
    try {
        let userId=req.params.userId;
        res.send(await articlesRepo.getArticleByUserId(userId));
    } catch (err) {
      console.error(`Erro: `, err);
    }
  });

  

router.post('/add', auth,  (req, res) => {
    const {title, content, UserId} = req.body;
  
    if (!title) {res.status(400).json({message: "merci de donner le titre de l'article"})}
    else {
              const NewArticle = {
                title,
                content,
                UserId,
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            
              articlesRepo.addArticle(NewArticle);
              res.status(200).redirect("http://localhost:3000/");
    }
  })

  
  router.post('/:id', auth, (req, res) => {
    articlesRepo.updateArticle(req.params.id, req.body);
    res.status(200).redirect("http://localhost:3000/");
  })
  
  
  router.delete('/:id', auth, (req, res) => {
    articlesRepo.deleteArticle(req.params.id);
    res.status(200).redirect("http://localhost:3000/");
  })
  
  module.exports = router;