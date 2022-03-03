const idParamIsInteger = (req, res, next) => {
    const id = req.params.id;
    const isInt = /^\+?(0|[1-9]\d*)$/.test(id);
    if (isInt) {
        next();
    } else {
        res.status(422).json({ success: false, message: 'Id no es un número entero correcto' });
    }
};

module.exports = idParamIsInteger;