const Customer = require("../models/customer.model")

// Create and save a new Customer
exports.create = (req, res)=>{
    // Validate request
    if(!req.body){
        res.status(400).send({
            message: "Content can mot be empty"
        })
    }

    // Create a customer
    const customer = new Customer({
        email: req.body.email,
        name:req.body.name,
        active: req.body.active
    })

    Customer.create(customer, (err, data)=>{
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            })
        }else{
            res.send(data)
        }
    })
}

// Retrieve all customers from the database
exports.findAll = (req, res)=>{
    Customer.getAll((err, data)=>{
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers"
            })
        }else{
            res.send(data)
        }
    })
}

// Find a single Customer with a customerId
exports.findOne = (req,res)=>{
    Customer.findById(req.params.customerId, (err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}`
                })
            }else{
                res.status(500).send({
                    message:"Error retrieving customer with id " + req.params.customerId
                })
            }
        }else{
            res.send(data)
        }
    })
}

exports.update = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty"
        })
    }

    Customer.updateById(
        req.params.customerId,
        new Customer(req.body),
        (err, data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message:`Not found Customer with id ${req.params.customerId}`
                    })
                }else{
                    res.status(500).send({
                        message:"Error updating Customer with id" + req.params.customerId
                    })
                }
            }else res.send(data)
        }
    )
}

// Delete a customer with the specified customerId in the request
exports.delete = (req, res) =>{
    Customer.remove(req.params.customerId, (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message:`Not found Customer with id ${req.params.customerId}`
                })
            }else{
                res.status(500).send({
                    message:"Could not delete Customer with id " + req.params.customerId
                })
            }
        }else res.send({message:`Customer was deleted successfully!`})
    })
}

// Delete all customers from the database
exports.deleteAll = (req, res)=>{
    Customer.removeAll((err, data)=>{
        if(err){
            res.status(500).send({
                message : err.message || "Some error occurred while removing all customers."
            })
        }else{
            res.send({message:`All Customers were deleted successfully!`})
        }
    })
}