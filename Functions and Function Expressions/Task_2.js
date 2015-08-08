function primeNumbersInRange(start, end){
    var i, j,
        prime = true,
        result = [];
    if (arguments.length < 2){
        throw Error;
    }

    for (i = 0; i < arguments.length; i+=1) {
        arguments[i] = +arguments[i];
        if (isNaN(arguments[i])){
            throw Error;
        }
    }
    if (start < 2){start = 2}
    for (i = start; i <= end; i += 1){

        for (j = 2; j < Math.sqrt(i + 1); j += 1) {
            if (!(i % j)){
                prime = false;
                break;
            }
        }
        if (prime){
        result.push(i);
        }
        prime = true;
    }
    return result;

}

