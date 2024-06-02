import collectionsUser from "../../../model/account.js";

const pinnedNote = (req, res) => {
    const email = req.body.email;
    const orderArray = req.body.index;
    const pinned = req.body.pinned;
    collectionsUser.findOneAndUpdate(
        { email: email },
        {
            $set: {
                [`dataNote.${orderArray}.pinned`]: !pinned,
            }
        },
        { new: true, }
    )
        .then((user) => {
            if (user == null) {
                res.status(200).send({ noUser: true, Message: "Email Not Found" });
            } else {
                res.status(201).send({ success: true, Message: "Set Pin Successfuly" });
            }
        })
        .catch(err => {
            res.status(200).send({ noUser: true, Message: "Email Not Found" });
        })
};

export default pinnedNote;