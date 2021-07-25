const { default: dbConnect } = require("../lib/dbConnect");
const { default: User } = require("../models/userModel");

const userFunctions = async (req, res) => {
    const { method } = req

    // Async Fx to connect to MongoDB
    await dbConnect()

    // Switch for methods GET, POST, PUT.
    // Delete not implemented by request
    switch (method) {
        case "GET": 
            const query = JSON.parse(JSON.stringify(req.query))
            if (query.query){
                try {
                    User.searchPartial(query.query, (err,data) => {
                        res.status(200).json({
                            success: true, data: data
                        })
                    })
                } catch (error) {
                    res.status(400).json({ success: false, message: error })
                }
            } else {
                if(query.userId){
                    try {
                        const user = await User.find({_id:query.userId})
                        res.status(200).json({
                            success: true, data: user
                        })
                    } catch (error) {
                        res.status(400).json({ success: false, message: error })
                    }
                }else{
                    try {
                        const users = await User.find({})
                        res.status(200).json({
                            success: true, data: users
                        })
                    } catch (error) {
                        res.status(400).json({ success: false, message: error })
                    }
                }
            }
            break;
        case "POST":
            try {
                const { name, doc, email, date } = req.body
                const userDoc = await User.findOne({ doc })
                if (userDoc) {
                    res.json({
                        success: false,
                        message: 'Documento duplicado... Verifica e intenta nuevamente.'
                    })
                } else {
                    const userEmail = await User.findOne({ email })
                    if (userEmail) {
                        res.json({
                            success: false,
                            message: 'Email duplicado... Verifica e intenta nuevamente.'
                        })
                    } else {
                        const userCreated = new User({ name, doc, email, date })
                        userCreated.save()
                        res.status(200).json({
                            success: true,
                            message: userCreated
                        })
                    }
                }

            } catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break;
        case "PUT":
            try {
                const { name, doc, email, date, id } = req.body
            if(name && doc && email && date && id){
                const userModified = await User.findOneAndUpdate({ _id: id }, { name, doc, email, date })
                if (userModified) {
                    res.status(200).json({
                        success: true,
                        data: userModified
                    })
                } else {
                    res.status(400).json({ success: false, message: "Algo salió mal. Intenta nuevamente." })
                }
            }else if(id && (!name || !doc || !email || !date)){
                const userUpdated = await User.findOneAndUpdate({ _id: id }, { deleted: true })
                const allUsersActive = await User.find({deleted:false})
                if (userUpdated) {
                    res.status(200).json({
                        success: true,
                        data: allUsersActive
                    })
                } else {
                    res.status(400).json({ success: false, message: "Algo salió mal. Intenta nuevamente." })
                }
            }
            } catch (error) {
                res.status(400).json({ success: false, message: error })   
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}

module.exports = userFunctions