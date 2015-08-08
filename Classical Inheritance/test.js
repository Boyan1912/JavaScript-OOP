var Person = (function () {

    function validateData(name){
        if (!/^[A-Za-z]{3,20}$/.test(name)){
            throw Error('Invalid name!');
        }
    }

    function validateAge(age){
        age = +age;
        if (!age){
            throw Error('Invalid age format!');
        }else if (age < 0 || age > 150){
            throw Error('Invalid person\'s age');
        }
    }

    function Person(firstname, lastname, age) {

        validateData(firstname);
        validateData(lastname);
        validateAge(age);
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;

    }

    Object.defineProperties(Person.prototype, {
        'fullname': {
            get: function(){
                return this.firstname + ' ' + this.lastname;
            },
            set: function(args){
                var names = args.split(' ');
                validateData(names[0]);
                this.firstname = names[0];
                validateData(names[1]);
                this.lastname = names[1];

            }
        },
        'introduce': {
            value: function(){
                return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
            }
        }


    });

    return Person;
} ());


var p = new Person('pesho', 'nikoi', 3);
p.lastname = 'gosho';
console.log(p.fullname);


