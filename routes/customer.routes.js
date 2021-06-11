module.exports = app =>{
    const customers = require("../controllers/customer.controller")

    // Create a new Customer 
    app.post("/customers", customers.create)
    // Retrieve all customers
    app.get("/customers", customers.findAll)
    // Retrieve a single Customer with customerId
    app.get("/customers/:customerId", customers.findOne)
    // Update a customer with customerId
    app.put("customers/:customerId", customers.update)
    // Delete a customer with customerId
    app.delete("/customers/:customerId", customers.delete)
    // Create a new Customer
    app.delete("/customers", customers.deleteAll)
}