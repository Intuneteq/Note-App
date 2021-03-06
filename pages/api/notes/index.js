import mynote from '../../../models/noteSchema';
import database from '../../../utils/database';



database();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const notes = await mynote.find({});
                res.status(200).json({
                    success: true,
                    data: notes
                });
            } catch (error) {
                res.status(400).json({
                    success: false
                });
            }
            break;

        case "POST":
            try {
                const notes = await mynote.create(req.body);
                res.status(201).json({
                    success: true,
                    data: notes
                })
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    success: false
                });
            }
            break;
    
        default:
            res.status(400).json({
                success: false
            });
            break;
    }
};