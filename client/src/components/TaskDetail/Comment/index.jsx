import React, { useState } from "react";
import "./style.scss";
import CommentItem from "./CommentItem";
import { useSelector, useDispatch } from "react-redux";
import {
  createTaskComment,
  deleteTaskComment,
  updateTaskComment,
} from "../../../redux/thunk/column";

const Comment = () => {
  const { task, project, auth } = useSelector((state) => state);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([...task.data.comments]);
  const dispatch = useDispatch();

  function onSubmitComment() {
    dispatch(
      createTaskComment({
        data: { content: value },
        token: auth.token,
        idProject: project.data._id,
        idTask: task.data._id,
        content: `đã coment trong thẻ ${task.data.title}`,
      })
    ).then((res) => {
      if (!res.error) {
        setValue("");
        setComments((prevComments) => [...prevComments, res.payload.comment]);
      }
    });
  }

  function onDeleteComment(idComment) {
    dispatch(
      deleteTaskComment({
        token: auth.token,
        idProject: project.data._id,
        idTask: task.data._id,
        idComment,
        content: `đã xóa bình luận trong thẻ ${task.data.title}`,
      })
    ).then((res) => {
      if (!res.error) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== idComment)
        );
      }
    });
  }

  function onUpdateComment(idComment, newContent) {
    return dispatch(
      updateTaskComment({
        data: { content: newContent },
        token: auth.token,
        idProject: project.data._id,
        idTask: task.data._id,
        idComment,
        content: `đã chỉnh sửa bình luận trong thẻ ${task.data.title}`,
      })
    ).then((res) => {
      if (!res.error) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === idComment ? res.payload : comment
          )
        );
      }
      return res;
    });
  }

  return (
    <div className="comment">
      <div className="comment__header">Bình luận</div>
      <div className="comment__input">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name=""
          id=""
          placeholder="Hãy bình luận về nhiệm vụ này"
          style={{
            resize: "none",
          }}
        ></textarea>
        <div className="comment__input-btns">
          <div>
            <i className="bx bx-smile"></i>
          </div>
          <div>
            <i className="bx bx-link-alt"></i>
          </div>
          <button className="btn contain" onClick={onSubmitComment}>
            Bình luận
          </button>
        </div>
        <div className="comment__list">
          {comments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((el, i) => (
              <CommentItem
                key={i}
                comment={el}
                onDeleteComment={onDeleteComment}
                onUpdateComment={onUpdateComment}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
