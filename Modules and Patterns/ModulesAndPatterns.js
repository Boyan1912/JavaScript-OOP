
function validateCourse(title, presentations){
    if (!title || !presentations  || presentations.length < 1 || typeof title !== 'string' ||
        /^ /.test(title) || / $/.test(title) || /  /.test(title)){
        throw Error('Invalid course parameters');
    }
    for (var i = 0; i < presentations.length; i++) {
        if (/^ /.test(presentations[i]) || / $/.test(presentations[i]) || /  /.test(presentations[i]) || !presentations[i]){
            throw Error('Invalid presentation parameters');
        }
    }
}

function validateStudentNames(name){
    if (typeof name !== 'string'){
        throw Error('Student name must be string!')
    }

    if (name.split(' ').length > 2){
        throw Error('Student must have only two names!');
    }

    var firstName = name.split(' ')[0],
        lastName = name.split(' ')[1];

    if (firstName.length < 2) {firstName += 'a'}
    if (lastName.length < 2) {lastName += 'a'}

    if (!(/^[A-Z][a-z]+$/.test(firstName)) || !(/^[A-Z][a-z]+$/.test(lastName))){
        throw Error('Invalid Student name!');
    }
}

function validateIDs(studentID, homeworkID){
    var studentFound = false;

    for (var i = 0; i < arguments.length; i++) {
        if (!(typeof arguments[i] === 'number') || arguments[i] < 1){
            throw Error('Invalid ID!');
        }else{
            arguments[i] = arguments[i] + '';
            if (/\./.test(arguments[i]) || /\,/.test(arguments[i])){
                throw Error('ID must be an integer number!');
            }
        }
    }

    for (i = 0; i < studentsArray.length; i += 1){
        if (studentsArray[i].ID == studentID){
            studentFound = true;
            break;
        }
    }
    if (!studentFound){
        throw Error('Student with this ID does not exist!');
    }

}

function checkUniqueID(idArray){
    for (var i = 0; i < idArray.length; i += 1) {
        for (var j = i + 1; j < idArray.length; j += 1) {
            if (idArray[i] === idArray[j]){
                throw Error('Student tried to cheat!')
            }
        }
    }
}

function validateScore(score){
    if (typeof score !== 'number'){
        throw Error('Wrong Exam Score!');
    }
}

var ID = 0,
    studentsArray = [];

var Course = {

    init: function(title, presentations) {
        var presentation,
            homeworkID = 0;

        validateCourse(title, presentations);

        this.title = title;
        this.presentations = [];
        this.students = studentsArray;

        for (var i = 0; i < presentations.length; i++) {
            presentation = {
                title: presentations[i],
                homework: {
                    ID: ++homeworkID
                }
            };
            this.presentations.push(presentation);
        }

        return this;
    },
    addStudent: function(name) {

        validateStudentNames(name);

        var student = {
            firstname: name.split(' ')[0],
            lastname: name.split(' ')[1],
            ID: getNextID()
        };

        this.students.push(student);

        function getNextID(){
            return ++ID;
        }

        return student.ID;
    },
    getAllStudents: function() {
        var result = [],
            nameAndIDobject, i;
        for (i = 0; i < this.students.length; i += 1){
            nameAndIDobject = {
                firstname: this.students[i].firstname,
                lastname: this.students[i].lastname,
                ID: this.students[i].ID
            };
            result.push(nameAndIDobject);
        }
        return result;
    },
    submitHomework: function(studentID, homeworkID) {

        validateIDs(studentID, homeworkID);

        for (var i = 0; i < this.students.length; i++) {
            if (this.students[i].ID === studentID){
                this.students[i].homeworks = [];
                this.students[i].homeworks.push(homeworkID);
            }
        }
    },
    pushExamResults: function(results) {
        var idArray = [];
        for (var i = 0; i < this.students.length; i += 1) {

            if (results[i]){
                idArray.push(results[i].StudentID);
                validateIDs(results[i].StudentID);
                validateScore(results[i].score);
            }

            for (var j = 0; j < results.length; j += 1) {

                if (this.students[i].ID === results[j].StudentID){
                    this.students[i].score = results[j].score;
                }
            }
            if (!this.students[i].score){
                this.students[i].score = 0;
            }
        }
        checkUniqueID(idArray);
    },
    getTopStudents: function() {

        var numberHomeWorks = this.presentations.length,
            result;

        function calcFinalScore(students){
            var finalScore = 0,
                homeWorksScore = 0;

            for (var i = 0; i < students.length; i += 1) {
                finalScore += (students[i].score * 75 / 100);

                if (students[i].homeworks){
                    homeWorksScore = (students[i].homeworks.length / numberHomeWorks) * (25 / 100);
                }
                finalScore += homeWorksScore;

                students[i].finalScore = finalScore;
                finalScore = 0;
            }
            return students;
        }

        result = calcFinalScore(this.students);
        result = result.sort(function(st1, st2){
            return st1.finalScore < st2.finalScore;
        });

        if (result.length > 10){
            result.length = 10;
        }

        return result;
    }
};

var jsoop = Object.create(Course)
    .init('OOP', ['pres']);
var id = jsoop.addStudent('Pesho' + ' ' + 'Nash');
jsoop.addStudent('Pesho' + ' ' + 'Nash');
jsoop.addStudent('Pesho' + ' ' + 'Nash');
jsoop.addStudent('Pesho' + ' ' + 'Nash');


jsoop.pushExamResults([{StudentID:'pesho',score:3},{StudentID:1, score:5}]);

console.log(jsoop.students);


