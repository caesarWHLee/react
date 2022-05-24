import React, { useState, useRef, useEffect, useCallback } from 'react'

import { getFeedbacks } from '../api'

const initialCommentCount = 3
const moreCommentCount = 10

export default function useComments() {
  const [showingComments, setShowingComments] = useState([])
  const [noMoreComment, setNoMoreComment] = useState(false)
  const hidingCommentsRef = useRef([])
  const skipRef = useRef(0)
  const takeRef = useRef(initialCommentCount + 2 * moreCommentCount)

  const fetchComments = useCallback(async (showCommentCount, firstTime = false) => {
    try {
      const result = await getFeedbacks({
        take: takeRef.current,
        skip: skipRef.current,
      })
      console.log('result', result)
      if (result?.data) {
        const { data: { formResults }, skip } = result.data
        skipRef.current = skip
        console.log(formResults, skip)

        if (firstTime) {
          takeRef.current = 2 * moreCommentCount
        }
        if (formResults.length) {
          const comments = formResults.map(({ id, name, result, responseTime }) => ({ id, name, content: result, date: responseTime }))
          hidingCommentsRef.current = [...hidingCommentsRef.current, ...comments]
          const commentsToShow = hidingCommentsRef.current.splice(0, showCommentCount)
          console.log(commentsToShow)
          setShowingComments(showingComments => [...showingComments, ...commentsToShow])
        } else {
          setNoMoreComment(true)
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  })

  const loadMoreComments = async () => {
    if (hidingCommentsRef.current.length < moreCommentCount) {
      console.log(`need to fetch more feedbacks take:${takeRef.current} skip:${skipRef.current}`)
      fetchComments(moreCommentCount)
    } else {
      const commentsToShow = hidingCommentsRef.current.splice(0, moreCommentCount)
      setShowingComments(showingComments => [...showingComments].concat(commentsToShow))
    }
  }

  useEffect(() => {
    fetchComments(initialCommentCount, true)
  }, [])

  return {
    comments: showingComments,
    noMoreComment,
    loadMoreComments
  }
}