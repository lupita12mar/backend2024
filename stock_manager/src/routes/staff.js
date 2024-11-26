const{Router}=require('express');
const { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff } = require('../controllers/Staff');

//anterior : const{getAll, getById}=require('../controllers/users');

const router=Router();

router.get('/',getAllStaff);

router.get('/:id',getStaffById);

//tarea
router.post('/', createStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);


module.exports=router;