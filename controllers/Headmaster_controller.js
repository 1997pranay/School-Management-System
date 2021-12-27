
const { Headmaster, validateHeadmaster } = require('../models/Headmaster');

exports.updateHeadmaster = async function (req, res) {
    try {
        const { error } = validateHeadmaster(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const result = await Headmaster.update({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                email: req.body.email
            }
        });
        return res.json({ Success: true, Message: "Your Headmaster has been updated" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Success: false, Message: err.message });

    }
}
