/* Task Description */
/* 
 Create a function constructor for Person. Each Person must have:
 *	properties `firstname`, `lastname` and `age`
 *	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
 *	age must always be a number in the range 0 150
 *	the setter of age can receive a convertible-to-number value
 *	if any of the above is not met, throw Error
 *	property `fullname`
 *	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
 *	the setter receives a string in the format 'FIRST_NAME LAST_NAME'
 *	it must parse it and set `firstname` and `lastname`
 *	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
 *	all methods and properties must be attached to the prototype of the Person
 *	all methods and property setters must return this, if they are not supposed to return other value
 *	enables method-chaining
 */
function solve() {
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
    return Person;
}



