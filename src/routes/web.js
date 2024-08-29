import express from "express";
import homeController from '../controller/homeController'
const router = express.Router();

/**
 * 
 * @param {*} app -express app
 */

const initWebRoutes = (app) => {
    //v1 : / path , v2 : handler
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUserPage);
    return app.use("/", router);
}

export default initWebRoutes;