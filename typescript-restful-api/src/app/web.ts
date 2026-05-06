import express from "express";
import exception from "../middleware/exception-middleware";
import publicApi from "../routes/public-api";
import authApi from "../routes/api";

const web = express();

web.use(express.json());

web.use(publicApi);
web.use(authApi);

web.use(exception)

export default web;