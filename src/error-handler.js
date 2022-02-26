// ErrorHandler = Manejador de Errores
// Middleware por si hay una excepción en algún servicio
const errorHandler = (err, req, res) => {
    console.log(err);
    res.status(err.status).send(err.message);
};

module.exports = errorHandler;