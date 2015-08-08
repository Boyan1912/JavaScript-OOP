function solve() {
    var library = (function () {
        var books = [];
        var categories = [];

        function listBooks(arg) {
            var sortedBooks;



            sortedBooks = books.sort(function(a, b){
                return a.ID - b.ID;
            });
            return sortedBooks;
        }

        function addBook(book) {
            var addedToCategories;
            book.ID = books.length + 1;
            books.push(book);
            for (var i = 0; i < categories.length; i++) {
                if (categories[i][book.category]){
                    categories[i][book.category].push(book);
                    addedToCategories = true;
                    break;
                }
            }

            if (!addedToCategories){
                categories.push(book.category);
            }


            return book;
        }

        function listCategories() {
            return categories.sort(function(a, b){
                return a.ID - b.ID;
            })
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    } ());

    return library;
}

