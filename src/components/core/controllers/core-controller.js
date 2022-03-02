exports.helloWorld = (req, res) => {
    return res.status(200).send({ success: true, message: '¡Hello World!' });
};