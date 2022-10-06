const passwordValidator = require('password-validator')
const pwSchema = new passwordValidator();

pwSchema
.is().min(6)
.is().max(16)
.has().uppercase()
.has().letters()
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(["Passw0rd", "Azerty123","Password123"]);

module.exports = pwSchema;