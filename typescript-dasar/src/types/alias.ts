export type Category = {
    id : Number;
    name : String;
};

export type Product = {
    id : Number;
    name : String;
    category: Category
};
