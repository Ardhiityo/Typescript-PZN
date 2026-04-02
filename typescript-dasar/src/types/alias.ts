export type ID = String | Number;

export type Category = {
    id : ID;
    name : String;
    description?: String;
};

export type Product = {
    id : ID;
    name : String;
    category: Category;
    description?: String;
};
