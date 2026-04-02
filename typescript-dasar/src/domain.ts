export interface HasName {
    name: String;
}

export interface HasId {
    id: Number;
}

export type Domain = HasName & HasId;