function solve(){

    var domElement = (function () {

        function validType(value){
            return (typeof value === 'string') && (value !== '') && (/^\w+$/i.test(value));
        }

        function validAttribute(name, value){
            if (value === ''){
                value = true;
            }
            return !!name && !!value && (/^[\w\-]+$/i.test(name));
        }

        function validChild(child){
            return child.prototype === domElement.prototype || typeof child === 'string';
        }

        function validParent(parent){
            return parent.prototype === domElement.prototype;
        }

        var domElement = {
            init: function(type) {
                if (validType(type)){
                    this.type = type;
                }else{
                    throw Error('Invalid type!')
                }
                this.content;
                this.parent;
                this.innerHTML;
                this.attributes = [];
                this.children = [];
                return this;
            },
            appendChild: function(child) {
                if (validChild(child)){
                    this.children.push(child);
                    child.parent = this;
                }
                return this;
            },
            addAttribute: function(name, value) {
                if (!validAttribute(name, value)){
                    throw Error('Invalid attribute parameters!');
                }
                this.attributes.push({
                    name: name,
                    value: value
                });
                return this;
            },
            removeAttribute: function(name){
                var indexSearchedElement,
                    i,
                    found;
                for (i = 0; i < this.attributes.length; i+=1) {
                    if (this.attributes[i].name === name){
                        found = true;
                        indexSearchedElement = i;
                        this.attributes.splice(indexSearchedElement, 1);
                    }
                }
                if (!found){
                    throw Error('Attribute to remove does not exist!');
                }
                return this;
            },
            get innerHTML(){
                var result = '',
                    sortedAttributes = this.attributes.sort(function(attr1, attr2){
                        return attr1.name > attr2.name;
                    }), i;

                result += '<' + this.type + ' ';
                for (i = 0; i < sortedAttributes.length; i += 1){
                    result += sortedAttributes[i].name + '="' + sortedAttributes[i].value + '" ';
                }
                result = result.trim();
                result += '>';
                if (this.content){
                    result += this.content;
                }
                for (i = 0; i < this.children.length; i += 1){
                    result += this.children[i].innerHTML;
                }
                result += '</' + this.type + '>';

                return result;
            },
            set content(value) {
                if (this.children.length < 1){
                    this.content = value;
                    return this;
                }

            },
            get content () {
                return this.content;
            },

            set parent(parent){
                if (validParent(parent)){
                    this.parent = parent;
                }
            },
            get parent() {
                return this.parent;
            }

        };
        return domElement;

    }());

    return domElement;
}
solve();
