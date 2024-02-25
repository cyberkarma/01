import {runServer} from "./server/runserver/runserver";
import express from "express";


export const app = express()
runServer(app)