const connection = require('../connection');

// get all vendors
const findAll = (req,res,next)=>{
    var query = "select * from vendors";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
}
// get all vendors
const findByKeyword = (req,res,next)=>{
    const value = req.query.value;
    if(value != null){
        console.log("keyword "+value)
    var query = "select * from vendors where address like CONCAT('%', ?, '%') or cell like CONCAT('%', ?, '%') or contact_person like CONCAT('%', ?, '%') or company like CONCAT('%', ?, '%') or email like CONCAT('%', ?, '%')";
    connection.query(query,[value,value,value,value,value],(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })

    }else{
        return findAll;

    }
    
}
// get vendors by id
const findById = async(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from vendors where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"vendors id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
    
}
    
// save vendors
const save=(req,res,next)=>{
    // const currentDate = new Date();
    let vendors = req.body;
    var query = "insert into vendors(address, cell, contact_person, company, email) values(?,?,?,?,?)";
    connection.query(query,[vendors.address,vendors.cell,vendors.contact_person,vendors.company,vendors.email],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"vendors added sucessfully"});
        }else{
            return res.status(500).json(err);
        }

    });

}
// update
const updateById = (req,res,next)=>{
    const id = req.params.id;
    let vendors = req.body;
    var query = " update vendors set address=?, cell=?, contact_person=?, company=?, email=? where id=?";
    connection.query(query,[vendors.address,vendors.cell,vendors.contact_person,vendors.company,vendors.email,id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"vendors id does not match."});

            }
            return res.status(200).json({message:"vendors updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}
//delete
const deleteById =(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from vendors where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"vendors id does not match."});

            }
            return res.status(200).json({message:"vendors deleted sucessfully."})
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
    findByKeyword
}