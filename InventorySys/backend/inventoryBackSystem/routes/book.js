const express = require('express');
const connection = require('../connection');
const router = express.Router();

// get request
router.get('/',(req,res, next)=>{
    var query = "select * from book";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })

});
// get request for single object
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from book where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"book id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });


});

// post request
router.post('./',(req,res,next)=>{
    let book = req.body;
    var query = "insert into book() values(?,?,?,?)";
    connection.query(query,[book.name,book.price,book.dept_id],(err,restult)=>{
        if(!err){
            return res.status(200).json({message:"Book added sucessfullu"});
        }else{
            return res.status(500).json(err);
        }

    });

});

// put or patch request
router.patch('/update/:id',(req,res,next)=>{
    const id = req.params.id;
    let book = req.body;
    var query = " update book set name=?,price=>,dept_id=>? where id=>";
    connection.query(query,[book.name,book.price,book.dept_id,id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"book id does not match."});

            }
            return res.status(200).json({message:"Book updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

});
// delete request



module.exports =router;