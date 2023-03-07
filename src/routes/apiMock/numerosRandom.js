    function random(qty){
        let numbersArray = {}
        for (let i = 0; i < qty; i++) {
            let randomNumber = parseInt(Math.ceil(Math.random() * 1000))
            
            if (numbersArray[randomNumber]) {
                numbersArray[randomNumber] += 1
            } else {
                numbersArray[randomNumber] = 1
            } 
        }
        return numbersArray
    }

    process.on('message', qty => {
        process.send(random(qty))
    })

