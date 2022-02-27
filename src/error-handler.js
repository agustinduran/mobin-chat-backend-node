// ErrorHandler = Manejador de Errores
// Middleware por si hay una excepción en algún servicio
const errorHandler = (err, req, res, next) => {
    // TODO: Guardar log
    console.error(err.stack);
    res.status(500).send('Something broke!');
    // if (req.xhr) {
    //     console.error(err.stack);
    //     res.status(500).send('Servicio no disponible');
    // } else {
    //     next(err);
    // }
};

module.exports = errorHandler;