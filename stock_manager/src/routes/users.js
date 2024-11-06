const{Router}=require('express');
const{getAllusers, getuserById, createUser,updateUser, deleteUser }=require('../controllers/users');

const router = Router();

router.get('/', getAllusers);
router.get('/:id', getuserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports=router;