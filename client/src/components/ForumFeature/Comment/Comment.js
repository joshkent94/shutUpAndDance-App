export default function Comment({comment}) {
    return (
        <div>
            {comment.comment}
            {`${comment.first_name} ${comment.last_name}`}
        </div>
    );
};