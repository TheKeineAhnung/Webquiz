# Webquiz

![License Logo](https://i.creativecommons.org/l/by-sa/3.0/88x31.png)
This work is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License.](https://creativecommons.org/choose/results-one?license_code=by-sa&jurisdiction=&version=3.0&lang=en)

## How to use

1. Download the repository.
2. Take the src folder and copy it into your directory. <br>
Attention: You must compile the .scss files to .css files ([Tutorial](https://mishkaorakzai.medium.com/how-to-add-and-compile-scss-to-run-automatically-in-the-background-on-an-existing-node-js-project-f0172141ae47))

### Add questions

1. Open the data folder.
2. Open the questions.json file.

#### Structure

#### Basic Structure

```json
{
    "id": x,
    "question": "",
    "answers": ["", "", "", ""],
    "correctAnswer": x,
    "duration": x
},
```

#### Example

```json
{
    "id": 0,
    "question": "Question 1",
    "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    "correctAnswer": 1,
    "duration": 15
},
```

`id`: int - ongoing number <br>
`question`: string - your question <br>
`answers`: array - your answers, up to 4 are possible <br>
`correctAnswer`: int - correct answer <br>
`duration`: int - duration of the question in seconds
