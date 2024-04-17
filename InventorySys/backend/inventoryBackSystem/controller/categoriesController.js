const connection = require('../connection');

// get all categories
const findAll = (req,res,next)=>{
    var query = "select * from categories";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
}
// get category by id
const findById = async(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from categories where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"Category id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
    
}
    
// save Category
const save=(req,res,next)=>{
    let category = req.body;
    var query = "insert into categories(cname) values(?)";
    connection.query(query,[category.cname],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"category added sucessfully"});
        }else{
            return res.status(500).json(err);
        }

    });

}
// update
const updateById = (req,res,next)=>{
    const id = req.params.id;
    let category = req.body;
    var query = " update categories set cname=? where id=?";
    connection.query(query,[category.cname,id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"category id does not match."});

            }
            return res.status(200).json({message:"category updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}
//delete
const deleteById =(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from categories where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"category id does not match."});

            }
            return res.status(200).json({message:"category deleted sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}


module.exports = {
    findAll,
    findById,
    save,
    updateById,
    deleteById,
}