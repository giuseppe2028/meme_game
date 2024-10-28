const LOGIN_ERROR = "Incorrect username or password"
const UNOUTH = "Unauthorized"
const BAD_REQUEST = "Bad request"
const NOTFINISHEDGAMEPLAY = "other gameplay not finished"
const NOTFOUND = "No elements found"
const NOT_GAME_FOUND = "No game started"
const ANSWER_JUST_INSERTED = "The answers have just been inserted"
const USER_NOT_FOUND = "User not found"




export class NotFinishedGameplay extends Error {
    constructor() {
        super()
        this.customMessage = NOTFINISHEDGAMEPLAY
        this.customCode = 409
    }

}

export class NotFoundError extends Error {
    constructor() {
        super()
        this.customMessage = NOTFOUND
        this.customCode = 404
    }

}

export class NotGameFoundError extends Error {
    constructor() {
        super()
        this.customMessage = NOT_GAME_FOUND
        this.customCode = 404
    }

}

export class UserNotFount extends Error {
    constructor() {
        super()
        this.customMessage = USER_NOT_FOUND
        this.customCode = 404
    }

}

export class AnswerJustInserted extends Error {
    constructor() {
        super()
        this.customMessage = ANSWER_JUST_INSERTED
        this.customCode = 409
    }

}
