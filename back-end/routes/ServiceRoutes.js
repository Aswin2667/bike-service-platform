const { addService,updateService,deleteServiceByName, getAllService } = require('../controllers/ServiceController');

const express = require('express');
const router = express.Router();
/**
 * @swagger
 * /service/add:
 *   post:
 *     summary: Add a new service
 *     tags: [Services]
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
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Service added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 service:
 *                   $ref: '#/components/schemas/Service'
 *       '500':
 *         description: Error adding service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post("/add",addService)
/**
 * @swagger
 * /service/update/{name}:
 *   put:
 *     summary: Update price and time to complete for a service by name
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the service to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               timeToComplete:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 updatedService:
 *                   $ref: '#/components/schemas/Service'
 *       '404':
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '500':
 *         description: Error updating service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.put("/update/:name",updateService)


/**
 * @swagger
 * /service/delete/{name}:
 *   delete:
 *     summary: Delete a service by name
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the service to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Service deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 deletedService:
 *                   $ref: '#/components/schemas/Service'
 *       '404':
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '500':
 *         description: Error deleting service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.delete("/delete/:name",deleteServiceByName)
/**
 * @swagger
 * /service/all:
 *   get:
 *     summary: Get a list of all services
 *     tags:
 *       - Services
 *     responses:
 *       '200':
 *         description: A list of all services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       '500':
 *         description: Error retrieving services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get("/all",getAllService)
module.exports = router