const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");

// launch swagger, @selenuygun
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
