import express from "express";
import userController from "../controller/user-controller";
import contactController from "../controller/contact-controller";
import auth from "../middleware/auth-middleware";
import addressController from "../controller/address-controller";
import ResponseException from "../exception/response-exception";

const authApi = express.Router();
authApi.use(auth);

// Automatically validate numeric parameters
authApi.param('contactId', (req, res, next, contactId) => {
    if (isNaN(Number(contactId))) {
        throw new ResponseException('Contact not found', 404);
    }
    next();
});

authApi.param('addressId', (req, res, next, addressId) => {
    if (isNaN(Number(addressId))) {
        throw new ResponseException('Address not found', 404);
    }
    next();
});

//user
authApi.get('/api/users/current', userController.current);
authApi.patch('/api/users/current', userController.update);
authApi.delete('/api/users/logout', userController.logout);

//contact
authApi.post('/api/contacts', contactController.create);
authApi.get('/api/contacts', contactController.search);
authApi.get('/api/contacts/:contactId', contactController.get);
authApi.delete('/api/contacts/:contactId', contactController.destroy);
authApi.put('/api/contacts/:contactId', contactController.update);

//address
authApi.post('/api/contacts/:contactId/addresses', addressController.create);
authApi.get('/api/contacts/:contactId/addresses', addressController.get);
authApi.get('/api/contacts/:contactId/addresses/:addressId', addressController.detail);
authApi.put('/api/contacts/:contactId/addresses/:addressId', addressController.update);
authApi.delete('/api/contacts/:contactId/addresses/:addressId', addressController.destroy);

export default authApi;