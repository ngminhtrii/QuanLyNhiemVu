import { User } from "../models/index.js";

export const updateProfile = async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log dữ liệu nhận được

    if (req.params.id !== `${req.user._id}`) {
      return res.status(400).json({
        err: "User không có quyền thay đổi profile của người khác",
      });
    }

    // Lấy thông tin hiện tại của người dùng
    const currentUser = await User.findById(req.params.id);
    if (!currentUser) {
      return res.status(404).json({ err: "Người dùng không tồn tại" });
    }

    // Object lưu các thay đổi
    const updates = {};

    // Kiểm tra và xử lý username
    if (
      req.body.username &&
      req.body.username.trim() !== "" &&
      req.body.username !== currentUser.username
    ) {
      const findUser = await User.findOne({ username: req.body.username });
      if (findUser) {
        return res
          .status(400)
          .json({ err: "Tên tài khoản đã có người sử dụng." });
      }
      updates.username = req.body.username;
    }

    // Kiểm tra và xử lý avatar
    if (req.body.avatar) {
      updates.avatar = req.body.avatar;
    }

    console.log("Updates to be applied:", updates); // Log các thay đổi

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ err: "Bạn chưa có avatar" });
    }

    // Cập nhật thông tin người dùng
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true, // Trả về thông tin sau cập nhật
      }
    );

    return res.json({
      msg: "Cập nhật profile thành công",
      user: updateUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error); // Log lỗi
    return res.status(500).json({ err: error.message });
  }
};
