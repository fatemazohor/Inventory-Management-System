const connection = require('../connection');

// get all status
const findAll = (req,res,next)=>{
    var query = "select * from status";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
}
// get status by id
const findById = async(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from status where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"status id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
    
}
    
// save status
const save=(req,res,next)=>{
    let status = req.body;
    var query = "insert into status(status) values(?)";
    connection.query(query,[status.status],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"status added sucessfully"});
        }else{
            return res.status(500).json(err);
        }

    });

}
// update
const updateById = (req,res,next)=>{
    const id = req.params.id;
    let status = req.body;
    var query = " update status set status=? where id=?";
    connection.query(query,[status.status,id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"status id does not match."});

            }
            return res.status(200).json({message:"status updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}
//delete
const deleteById =(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from status where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"status id does not match."});

            }
            return res.status(200).json({message:"status deleted sucessfully."})
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