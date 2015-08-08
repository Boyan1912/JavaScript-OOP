var library = (function() {
    var id = 0,
        isbnArray = [],
        categories = {},
        books = [],
        options = {
            category: (function(){
                return books.sort(function(b1, b2){
                    return b1.category - b2.category;
                })
            })(),
            authors: (function(){
                return books.sort(function(b1, b2){
                    return b1.author < b2.author;
                })
            } )()
        };

    function createID(){
        return arguments[0] ? id += 1 : '000' + (id += 1);
    }

    function createISBN(){
        var digit, i,
            isbn = '',
            isbnLength = Math.random() > 0.4999 ? 13 : 10;
        for (i = 0; i < isbnLength; i += 1) {
            digit = (Math.random() * 10 | 0) + '';
            isbn += digit;
        }
        for (i = 0; i < isbnArray.length; i += 1) {
            if (isbn === isbnArray[i]){
                createISBN();
            }
        }
        isbnArray.push(isbn);
        return isbn;
    }

    function addBook(title, author, category){

        if (typeof author !== 'string' || author.length < 1){
            throw Error ('Invalid author\'s name');
        }
        for (var i = 0; i < books.length; i++) {
            if (books[i].title === title){
                throw Error('Invalid title')
            }
        }

        var book = (function(){
            return {
            title: title,
            author: author,
            category: category,
            id: createID(),
            ISBN: createISBN()
        }
        })();
        if (categories[category]){
            categories[category].push(book)
        }else{

            categories[category] = [book];
            categories[category].ID = createID(true);
        }
        books.push(book);
        return book;
    }

    function listAllBooks(args){
        return options[args[0]] ? options[args[0]] : books.sort(function(b1, b2){
            return b1.id - b2.id;
        })
    }
    function listCategories(){
        var result = [], i;
        for (i in categories){
            result.push(i);
        }

        return result.sort(function(a, b){
            return a.id - b.id;
        })
    }

    return {
        addBook: addBook,
        listAllBooks: listAllBooks,
        listCategories: listCategories
    };


})();

library.addBook('', 'OK', 'thriller');
library.addBook('John', 'King', 'action');
library.addBook('John2', 'AAA', 'drama');
console.log(library.listAllBooks('category'));
console.log(library.listCategories());


