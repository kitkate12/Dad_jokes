const fs = require("fs");
const request = require("request");
let jokes;

if (process.argv[2]) {
    request(`https://icanhazdadjoke.com/search?term=${process.argv[2]}`, { json: true }, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            if (body.total_jokes > 0) {
                jokes = body.results;
                let randomNum = Math.round(Math.random() * (body.results.length - 1));
                fs.createWriteStream('jokes.txt').write(jokes[randomNum].joke);
                fs.readFile('jokes.txt', 'utf8', (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            } else {
                console.log("non ho trovato nulla!");
            }

        }
    });
} else {
    console.log("inserisci un'argomento!");
}