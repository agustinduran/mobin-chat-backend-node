const error404 = (req, res, next) => {
    res.status(404).send({success: false, message: 'No existe ese recurso'});
};

const errorCatcher = (err, req, res, next) => {
    // TODO: Guardar log
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error message
    res.status(err.status || 500).send({success: false, message: 'Servicio temporalmente no disponible'});
};

module.exports = { error404, errorCatcher };