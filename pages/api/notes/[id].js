import mynote from "../../../models/noteSchema";
import database from "../../../utils/database";

database();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const notes = await mynote.findById(id);
        if (!notes) {
          res.status(400).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          data: notes,
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
        });
      }
      break;

    case "PUT":
      try {
        const notes = await mynote.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!notes) {
          res.status(400).json({
            success: false,
          });
        }

        res.status(200).json({
          success: true,
          data: notes,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;

    case "DELETE":
      try {
        const deleteNote = await mynote.deleteOne({ _id: id });
        if (!deleteNote) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({
          success: true,
          data: deleteNote,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({
        success: false,
      });
      break;
  }
};
