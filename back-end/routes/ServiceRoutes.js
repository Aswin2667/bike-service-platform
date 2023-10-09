const { addService,updateService,deleteServiceByName, getAllService } = require('../controllers/ServiceController');

const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /service/add:
 *   post:
 *     summary: Add a new service
 *     description: Add a new service with the given name, price, time to complete, and service image.
 *     tags:
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               timeToComplete:
 *                 type: number
 *               serviceimage:
 *                 type: string
 *             required:
 *               - name
 *               - price
 *               - timeToComplete
 *     responses:
 *       '200':
 *         description: Service added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Service added
 *                 service:
 *                   $ref: '#/components/schemas/Service'
 *       '500':
 *         description: Internal server error.
 */
router.post("/add",addService)
/**
 * @swagger
 * /service/{_id}:
 *   put:
 *     summary: Update a service by ID
 *     description: Update the price, time to complete, and name of a service by its ID.
 *     tags:
 *       - Services
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the service to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               timeToComplete:
 *                 type: number
 *             required:
 *               - name
 *               - price
 *               - timeToComplete
 *     responses:
 *       '200':
 *         description: Service updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Service updated
 *                 updatedService:
 *                   $ref: '#/components/schemas/Service'
 *       '404':
 *         description: Service not found.
 *       '500':
 *         description: Internal server error.
 */
router.put("/update/:_id",updateService)

/**
 * @swagger
 * /service/{_id}:
 *   delete:
 *     summary: Delete a service by ID
 *     description: Delete a service by its ID.
 *     tags:
 *       - Services
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the service to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Service deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Service deleted
 *                 deletedService:
 *                   $ref: '#/components/schemas/Service'
 *       '404':
 *         description: Service not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/delete/:_id",deleteServiceByName)
/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     description: Retrieve a list of all services.
 *     tags:
 *       - Services
 *     responses:
 *       '200':
 *         description: List of services retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       '500':
 *         description: Internal server error.
 */
router.get("/all",getAllService)
module.exports = router