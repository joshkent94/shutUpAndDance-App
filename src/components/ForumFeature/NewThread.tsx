import { useState } from 'react'
import { useRouter } from 'next/router'
import { createThread, getThreadsByUserId } from '@utils/state/forumSlice'
import { useAppDispatch } from '@utils/state/store'

export default function NewThread() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const [comment, setComment] = useState('')

    const handleTitleChange = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handleCommentChange = (e) => {
        e.preventDefault()
        setComment(e.target.value)
    }

    // create thread, then update user's threads in state
    // and navigate to the newly created thread
    const handleNewThread = (e) => {
        e.preventDefault()
        dispatch(
            createThread({
                title: title,
                comment: comment,
            })
        )
            .unwrap()
            .then((thread) => {
                dispatch(getThreadsByUserId())
                router.push(`/forum/${thread?.id}`)
            })
    }

    return (
        <div className="flex h-full flex-col pt-4">
            <form
                className="flex grow flex-col items-center justify-center rounded-[0.2rem] border border-third bg-secondary p-2"
                onSubmit={handleNewThread}
            >
                <label className="mb-8 w-4/5 font-semibold">
                    Title
                    <input
                        className="form-control mt-4 w-full text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                        type="text"
                        placeholder="Title"
                        onChange={handleTitleChange}
                        maxLength={255}
                        required
                    />
                </label>
                <label className="mb-8 w-4/5 font-semibold">
                    Comment
                    <textarea
                        className="form-control mt-4 h-[300px] w-full text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                        placeholder="What's on your mind..."
                        onChange={handleCommentChange}
                        required
                    />
                </label>

                <button
                    className="coolBeans mb-12 mt-4 w-48 bg-primary text-secondary after:bg-secondary hover:text-primary focus-visible:outline-none"
                    type="submit"
                >
                    Create Thread
                </button>
            </form>
        </div>
    )
}
