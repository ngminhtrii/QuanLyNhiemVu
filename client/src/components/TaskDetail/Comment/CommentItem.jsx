import React, { useState, useEffect } from "react";

const CommentItem = ({ comment, onDeleteComment, onUpdateComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setNewContent(comment.content);
  }, [comment.content]);

  const handleUpdate = async () => {
    const res = await onUpdateComment(comment._id, newContent);
    if (!res.error) {
      setIsEditing(false);
      setShowOptions(false);
      setNewContent(res.payload.content); // Cập nhật ngay lập tức
    }
  };

  return (
    <div className="comment__item">
      <div className="comment__item-header">
        <div className="comment__item-header__avatar">
          <img src={comment.user.avatar} alt="" />
          <div className="comment__item-header__avatar-active"></div>
        </div>
        <h3 className="comment__item-header__name">{comment.user.username}</h3>
        <div className="comment__item-header__icon dropdown">
          <i
            className="bx bx-dots-horizontal-rounded"
            onClick={() => setShowOptions(!showOptions)}
          ></i>
          {showOptions && (
            <div className="dropdown__content">
              <div
                className="item"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteComment(comment._id);
                }}
              >
                <i className="bx bx-trash"></i>
                <p>Xóa</p>
              </div>
              <div
                className="item"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(!isEditing);
                  setShowOptions(false);
                }}
              >
                <i className="bx bx-edit"></i>
                <p>Chỉnh sửa</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Cập nhật</button>
        </div>
      ) : (
        <div className="comment__item-content">{comment.content}</div>
      )}
      {/*<div className="comment__item-footer">
        <div className="comment__item-footer__icon">
          <i className="bx bx-smile"></i>
        </div>
        <div className="comment__item-footer__reply">Phản hồi</div>
        <div className="comment__item-footer__time">6 giờ trước</div>
      </div>*/}
    </div>
  );
};

export default CommentItem;
