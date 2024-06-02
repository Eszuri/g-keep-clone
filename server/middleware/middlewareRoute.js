import { api, note } from "../api/controller/index.js";


// route /api
function middlewareRoute(app) {
    app.use("/api", api);
    app.use("/note", note);
    app.use((req, res, next) => {
        res.status(404).send('Page Not Found');
    });
};

export default middlewareRoute;