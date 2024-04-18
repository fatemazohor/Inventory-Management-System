const connection = require('../connection');

// get all customers
const findAll = (req,res,next)=>{
    var query = "select * from customers";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
}
// get all customers
const findByKeyword = (req,res,next)=>{
    const value = req.query.value;
    if(value != null){
        console.log("keyword "+value)
    var query = "select * from customers where address like CONCAT('%', ?, '%') or phone like CONCAT('%', ?, '%') or customer_name like CONCAT('%', ?, '%') or email like CONCAT('%', ?, '%')";
    connection.query(query,[value,value,value,value],(err,result)=>{
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
// get customers by id
const findById = async(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from customers where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"customers id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
    
}
    
// save customers
const save=(req,res,next)=>{
    // const currentDate = new Date();
    let customers = req.body;
    var query = "insert into customers(address, phone, customer_name, email) values(?,?,?,?)";
    connection.query(query,[customers.address,customers.phone,customers.customer_name,customers.email],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"customers added sucessfully"});
        }else{
            return res.status(500).json(err);
        }

    });

}
// update
const updateById = (req,res,next)=>{
    const id = req.params.id;
    let customers = req.body;
    var query = " update customers set address=?, phone=?, customer_name=?, email=? where id=?";
    connection.query(query,[customers.address,customers.phone,customers.customer_name,customers.email,id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"customers id does not match."});

            }
            return res.status(200).json({message:"customers updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}
//delete
const deleteById =(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from customers where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"customers id does not match."});

            }
            return res.status(200).json({message:"customers deleted sucessfully."})
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