import { Comment, Task } from "../models/index.js";

export const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const newComment = new Comment({
      content,
      task: req.params.idTask,
      user: req.user._id,
    });

    await newComment.save();

    let findComment = await Comment.findOne({
      _id: newComment._id,
    }).populate({
      path: "user",
      select: { avatar: 1, username: 1 },
    });

    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.idTask },
      { $push: { comments: newComment._id } },
      { returnDocument: "after" }
    );

    return res.status(200).json({
      task: updateTask,
      comment: findComment,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { idComment, idTask } = req.params;
    await Comment.findByIdAndDelete(idComment);
    await Task.findByIdAndUpdate(idTask, {
      $pull: { comments: idComment },
    });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { idComment } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      idComment,
      { content },
      { new: true }
    ).populate({
      path: "user",
      select: { avatar: 1, username: 1 },
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
