import { createCommentQuery, deleteCommentQuery, fetchAllCommentsQuery } from "../query/commentQuery"


class CommentsModel {
    #commentID
    #recordID
    #userID
    #content
    #userName

    constructor({commentID = null, recordID = null, userID = null, content = null, userName = null}) {
        this.#commentID = commentID
        this.#recordID = recordID
        this.#userID = userID
        this.#content = content
        this.#userName = userName
    }

    
    extractJSON() {
        return {
            commentID: this.#commentID,
            recordID: this.#recordID,
            userID: this.#userID,
            content: this.#content,
            userName: this.#userName
        }
    }


    // Load all the comments
    static async loadCommentList(recordID) {
        const response = await fetchAllCommentsQuery(recordID)
        
        // Creating comment instants 
        let commentList = []
        if(response.status === 200 && response.data.proceed) {
            response.data.content.forEach(element => {
                commentList.push(new CommentsModel(element))
            });
        }

        return commentList
    }


    // Delete comment 
    async deleteComment() {
        const response = await deleteCommentQuery(this.#commentID)
        return response.status === 200 && response.data.proceed
    }


    // Creating new comment 
    async createNewComment() {
        const response = await createCommentQuery(this.extractJSON())
        return (response.status === 200 && response.data.proceed)
    }



    // Getter and setter
    getUserName() {
        return this.#userName
    }

    setUserName(userName) {
        this.#userName = userName
    }

    getCommentID() {
        return this.#commentID;
    }

    setCommentID(commentID) {
        this.#commentID = commentID;
    }

    getRecordID() {
        return this.#recordID;
    }

    setRecordID(recordID) {
        this.#recordID = recordID;
    }


    getUserID() {
        return this.#userID;
    }

    setUserID(userID) {
        this.#userID = userID;
    }


    getContent() {
        return this.#content;
    }

    setContent(content) {
        this.#content = content;
    }

}

export default CommentsModel