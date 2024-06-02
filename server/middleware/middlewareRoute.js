import { api, note } from "../api/controller/index.js";
import { cookieParser } from 'cookie-parser';


// route /api
function middlewareRoute(app) {
    app.use("/api", api);
    app.use("/note", note);
    app.use((req, res, next) => {
        res.status(404).send('Page Not Found');
    });
};

export default middlewareRoute;