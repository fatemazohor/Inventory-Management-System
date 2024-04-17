const connection = require('../connection');

// get all warehouses
const findAll = (req,res,next)=>{
    var query = "select * from warehouses";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
}
// get warehouse by id
const findById = async(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from warehouses where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"warehouse id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
    
}
    
// save warehouse
const save=(req,res,next)=>{
    let warehouse = req.body;
    var query = "insert into warehouses(wname) values(?)";
    connection.query(query,[warehouse.wname],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"warehouse added sucessfully"});
        }else{
            return res.status(500).json(err);
        }

    });

}
// update
const updateById = (req,res,next)=>{
    const id = req.params.id;
    let warehouse = req.body;
    var query = " update warehouses set wname=? where id=?";
    connection.query(query,[warehouse.wname,id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"warehouse id does not match."});

            }
            return res.status(200).json({message:"warehouse updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}
//delete
const deleteById =(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from warehouses where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"warehouse id does not match."});

            }
            return res.status(200).json({message:"warehouse deleted sucessfully."})
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