import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IComment } from './utils/TypesScript'
import { CREATE_COMMENT, DELETE_COMMENT, DELETE_REPLY, REPLY_COMMENT, UPDATE_COMMENT, UPDATE_REPLY } from './redux/types/commentType'


const SocketClient = () => {

    const { socket } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch<any>()

    // createComment
    useEffect(() => {
        if(!socket) return;

        socket.on('createComment', (data: IComment) => {
             dispatch({
                type: CREATE_COMMENT,
                payload: data
            })
            
        })

        return () => {
            socket.off('createComment')
        }
    },[socket, dispatch])

    // replyComment
    useEffect(() => {
        if(!socket) return;

        socket.on('replyComment', (data: IComment) => {
            dispatch({
            type: REPLY_COMMENT,
            payload: data
            })   
        })

        return () => {
            socket.off('replyComment')
        }
    },[socket, dispatch])

    // updateComment
    useEffect(() => {
        if(!socket) return;

        socket.on('updateComment', (data: IComment) => {
            dispatch({
                type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
                payload: data
            }) 
        })

        return () => {
            socket.off('updateComment')
        }
    },[socket, dispatch])


    // deleteComment 
    useEffect(() => {
        if(!socket) return;

        socket.on('deleteComment', (data: IComment) => {
            dispatch({
                type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
                payload: data
            })
        })

        return () => {
            socket.off('deleteComment')
        }
    },[socket, dispatch])


  return (
    <div></div>
  )
}

export default SocketClient