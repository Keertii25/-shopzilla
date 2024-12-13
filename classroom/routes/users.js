const express=require('express');
const router=express.Router();
router.get('/', (req, res) => {
    // Simulate fetching users from a database
    res.send('Fetching all users');
});

// Show route for a specific user by ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send("Fetching details for user with ID: ");
});

// Post route to create a new user
router.post('/', (req, res) => {
    const newUser = req.body;
    // Simulate saving the user to a database
    res.send("New user created: ");
});

// Delete route to remove a user by ID
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    // Simulate deleting the user from a database
    res.send("the user id");
});
module.exports=router;