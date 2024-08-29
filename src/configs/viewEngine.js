import express from "express";

/**
 * 
 * @param {*} app -express app
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs"); //Su dung cong nghe gi de viet code html trong node js
    app.set("views", "./src/views"); // noi luu source

}

export default configViewEngine;