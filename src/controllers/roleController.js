const Role = require('../models/Role');

// Create role
exports.createRole = async (req, res) => {
    const { name, permissions } = req.body;
    try {
        const role = new Role({ name, permissions });
        await role.save();
        res.status(201).json({ message: 'Role created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Role creation failed', error: err.message });
    }
};
