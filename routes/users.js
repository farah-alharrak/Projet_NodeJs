const router = require('express').Router(); 
const user = require('../models/user.js');
const usersRepo = require('../respositories/users.js')
const auth = require('../middleware/auth.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  usersRepo.getUsers(parseInt(req.query.offset), parseInt(req.query.limit))
      .then((users) => res.status(200).json(users))
      .catch(err => console.log(err));
});


router.get('/all', async function(req, res) {
  try{
    res.send(await usersRepo.getAllUsers())
}catch(err){(err => console.log(err));}

});



/// par rôle

router.get('/users/:role', (req, res) => {
  switch (req.params.role) {    // req.params object is used because it has access to all the parameters passed in the url
    case "admin":
      usersRepo.getAdmins()
        .then(users => res.status(200).json(users))    
        .catch(err => console.log(err));
      break;
    case "author":
      usersRepo.getAuthors()
        .then(users => res.status(200).json(users))
        .catch(err => console.log(err));
      break;
    case "guest":
      usersRepo.getGuests()
        .then(users => res.status(200).json(users))
        .catch(err => console.log(err));
      break;
  } 
})

/// par identifiant

router.get('/id/:id', (req, res) => {
usersRepo.getUser(req.params.id)
  .then(user => res.status(200).json(user))
  .catch(err => console.log(err));
})

/// par email

router.get('/email/:email', (req, res) => {
usersRepo.getUserByEmail(req.params.email)
  .then(user => res.status(200).json(user))
  .catch(err => console.log(err));
})

/// add user

router.post('/add', auth, (req, res) => {
const {username, email, password, role} = req.body;

if (!username || !email || !password) {res.status(400).json({message: "veuillez entrer tous les elements"})}
else {
          const newUser = {
            username,
            email,
            password, 
            role,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          
          usersRepo.addUser(newUser);
          res.status(200).redirect("http://localhost:3000/");  /// rediriger vers le port 3000
}
})
 /// la modification 
router.put('/:id', auth, (req, res) => {
usersRepo.updateUser(req.params.id, req.body);
res.status(200).redirect("http://localhost:3000/");
})


router.delete('/:id', auth, (req, res) => {
usersRepo.deleteUser(req.params.id);
res.status(200).redirect("http://localhost:3000/");
})
 

module.exports = router;
