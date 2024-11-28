const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    permissions: [{ type: String }], // Array of permissions (e.g., 'READ', 'WRITE')
});

module.exports = mongoose.model('Role', roleSchema);
