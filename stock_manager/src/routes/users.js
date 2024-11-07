const{Router}=require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users');

//anterior : const{getAll, getById}=require('../controllers/users');

const router=Router();

router.get('/',getAllUsers);

router.get('/:id',getUserById);

//tarea
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports=router;