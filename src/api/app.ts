import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import * as geniallyController from "./controllers/genially";
import {deleteGenially} from "./controllers/genially";


// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
app.get('/', healthController.check);
app.post('/genially', geniallyController.postGenially);
app.put('/genially/:id', geniallyController.putGenially);
app.delete('/genially/:id', geniallyController.deleteGenially);

export default app;
