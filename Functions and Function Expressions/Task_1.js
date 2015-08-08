
    function sumNumbers (arr){

        var sum = 0;
        if (arr.length < 1){
            return null;
        }
        if (arr === undefined){
            return Error;
        }
        arr = arr.map(Number);

        for (var i = 0; i < arr.length; i++) {

            if (isNaN(arr[i])){
                throw Error;
            }
            sum += arr[i];

        }
        return sum;
    }






