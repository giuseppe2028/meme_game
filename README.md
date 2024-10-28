[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/J0Dv0VMM)
# Exam #1: "GIOCO MEME"
## Student: s332157 BARONE GIUSEPPE MARIA

## React Client Application Routes

- Route `/`: no page, redirect to login
<br> All the following route are under the `/` which represent the navbar. 
- Route `/login`: page with a login form, where the user could enter as a guest (no username or password needed) or as a registered user
- Route `/home`: page with a play button, for starting a game, and the explanation of the rules
- Route `/gamePlay`: page that contains all the logic of the game. It is composed by 3 rounds (for a registered user), or by 1 round (for a guest user). each round contians a meme image with
                      a list of 7 descriptions of the meme, a timer, the next button.
- Route `/gamePlay/results`: page that contains the results of the game, with: list of the memes with the selected caption, the total point and two buttons for restarting a game or going to the home page
- Route `/profile`: page that contains the personal information of a registered user, and two button for going respectively to history or to home page
- Route `/history`: page that contains all the games played by a registered user. There is the possibility to order by idMatch, date, and point. Also there is a button for see the rounds played in detail.
- Route `*`: Page not found


## API Server

### Session

- POST `/session/login`
  - Request Parameters: None
  - Request Body Content: An object having as attributes:
    - `username`: a string that must not be empty
    - `password`: a string that must not be empty
    - Example: `{username: "test", password: "test"}`
  - Response Body Content: A username that represents the logged in user
    - Example: `{username: "MarioRossi"}`
  - Access Constraints: None
  - Additional Constraints:
    - Returns a 401 error if the username does not exist
    - Returns a 401 error if the password provided does not match the one in the database

- POST `/session/logout`
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: None
  - Access Constraints: Can only be called by a logged in User
  - Additional Constraints: None

### Meme Management

- GET `/meme` return a list of 3 random meme with 7 descriptions
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content:
    - meme: name of the meme
    - description of the meme (5 wrong 2 correct)
  ```
  [
  {
    "name": "meme1",
    "description": [
      {
        "description": "desc1"
      },
      {
        "description": "desc2"
      },
      {
        "description": "desc3"
      },
      {
        "description": "desc4"
      },
      {
        "description": "desc5."
      },
      {
        "description": "desc6"
      },
      {
        "description": "desc7"
      }
    ]
  },
  ...
  ]
  ```
  - Access Constraints: Can only be called by a logged in User
  - Additional Constraints:
    - It should return a 400 error when the user is not authenticated

  
- GET `/meme/single` return a single random meme with 7 descriptions
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content:
    - meme: name of the meme
    - description of the meme (5 wrong 2 correct)
  ```
  {
    "name": "meme1",
    "description": [
      {
        "description": "desc1"
      },
      {
        "description": "desc2"
      },
      {
        "description": "desc3"
      },
      {
        "description": "desc4"
      },
      {
        "description": "desc5."
      },
      {
        "description": "desc6"
      },
      {
        "description": "desc7"
      }
    ]
  }
  ```
  - Access Constraints: None
  - Additional Constraints: None

### Gameplay Management

- POST `/gameplay` create a new gameplay
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: None
  - Access Constraints: Can only be called by a logged in User
  - Additional Constraints: 
    - It should return a 409 error when there is gameplay that hasn't been finished
    - It should return a 400 error when the user is not authenticated


- POST `/gameplay/allRounds`
  - Request Parameters: None
  - Request Body Content:
    - list of 3 rounds. Each round is composed by: 
      - meme: name of the meme which appeared in the gameplay
      - round_number: the number of the round
      - caption_selected: caption selected by user (None if the user hasn't inserted a caption)
      - Example: 
      ```
      "rounds":[
        {
        "meme":"img1.jpg",
        "round_number":"1",
        "caption_selected":"None"
        },
        {
        "meme":"img3.jpg",
        "round_number":"2",
        "caption_selected":"Andare al mare; studiare per la sessione estiva"
        },
        {
        "meme":"img2.jpg",
        "round_number":"3",
        "caption_selected":"Andare al mare; studiare per la sessione estiva"
        }
      ]
  - Response Body Content: None
  - Access Constraints: Can only be called by a logged in User
  - Additional Constraints:
    - It should return a 400 error when the user is not authenticated
    - It should return a 400 error when body is empty or has empty or wrong parameters
    - It should return a 409 error when there is no gameplay created
    - It should return a 409 error when the answers have been just added

- GET `/gameplay/current/rounds`
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: 
    - Example: 
      - meme: the name of the meme
      - caption_selected: caption selected by user (None if the user hasn't inserted a caption)
      - round_number: the number of the round
      - score: the score earned (5 if the answer is correct, 0 if not)
    ```
    [
      {
      "meme": "...",
      "caption_selected": "None",
      "round_number": 1,
      "score": 0
      }...
      ]
    ```
  - Access Constraints: Can only be called by a logged in User
  - Additional Constraints:
    - It should return a 400 error when the user is not authenticated

- GET `/gameplay/current`
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content:
    - Example:
      - id_game: the id of the current game
    ```
      {
      "id_game": "1"
      } 
    ```
  - Access Constraints: Can only be called by a logged in User
  - Additional Constraints:
    - It should return a 400 error when the user is not authenticated

- Delete `/gameplay` delete the current gameplay
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: None
  - Access Constraints: Can only be called by a logged in User
  - Additional Constraints:
    - It should return a 400 error when the user is not authenticated

- GET `/gameplay/history`
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content:
    - Example:
      - date: date of the gameplay
      - totalScore: the total score of the gameplay
      - rounds: a list of the rounds for that gameplay
    ```[
    {
        "date": "2024-12-12",
        "totalScore":10,
        "rounds": [
            {
                "meme": "meme1",
                "caption_selected": "cap1",
                "round_number": 1,
                "score": 5
            },
            {
                "meme": "meme1",
                "caption_selected": "cap2",
                "round_number": 2,
                "score": 0
            }...
        ]
    }
    ]
  - Access Constraints: Can only be called by a logged in User
  - Additional Constraints:
    - It should return a 400 error when the user is not authenticated
    
- PUT `/end` (terminate a gameplay)
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: None
  - Access Constraints: Can only be called by a logged in User
  - Additional Constraints: 
    - It should return a 400 error when the user is not authenticated
    - It should return a 404 error when there is no gameplay to finish

## Database Tables

- Table `Player` - contains username, first_name, last_name, mail, password, salt
- Table `Game` - contains id_game, date, ref_player, finish, result
- Table `Meme` - contains id_meme, name_image
- Table `Caption` - contains id_caption, ref_meme, description
- Table `Round` - contains ref_player, ref_meme, ref_caption, ref_game, round_number, score

## Main React Components

- `CustomNavbar` (in `App.jsx`): component for manage the navbar. Contains the logout button, history button, profile button, with a NavDropdownItem
- `CustomToast` (in `LoginPage`): component for notify the user that the mail e/or password is incorrect.
- `CustomForm` (in `LoginPage`) : component for displaying the login form (contains a button for login and 2 Form control where the user can insert the mail and password)
- `LoadingSpinner` (in `HistoryPage, LoginPage, Meme Profile`): component for manage the slowness of the server 
- `GameRulesComponent` (in `LoginPage`): component for displaying the rules of the game
- `LoginComponent` (in `LoginPage`): Compoent for manage all the login part of the page (contains both the form and the guest button)
- `BottomNavigation` (in `MemePage`): Component for navigation during a game
- `ButtonMemeGroup` (in `LoginPage`): component that contains all the button for selecting a meme
- `MemeContent` (in `LoginPage`): component that display both the image of the meme and the ButtonMemeGroup for the selection
- `Timer` (in `MemePage`): component for managing the timer counter, with the Progressbar.
- `ButtonNavProfile` (in `ProfileCard`): Component that contains two buttons with the possibility to navigate in the Profile page
- `ProfileCard` (in `ProfilePage`): component that display the personal information of the user, with the possibility of navigation through pages. 
- `BottomNavBar` (in `ResultGamePage`): component that contains two buttons for navigation  through pages.
- `ResultCard` (in `LoginPage`): Card that contains a table of the results of the game and the total point achieved
- `ResultContent` (in `LoginPage`): component with a table of the results
- `GeneralToast` (in `MemePage`): component used for managing the answer of the user. It shows a correct message or a wrong message with the correct answer

## Screenshot

![readImg1.png](imgReadme%2FreadImg1.png)
![readImg2.png](imgReadme%2FreadImg2.png)
## Users Credentials

- test, test 
- MarioRossi123, MarioTestRossi 
