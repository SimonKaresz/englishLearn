export interface iWordElement{
    category:string;
    eng:string;
    hun:string;
    userId:string;
    id:string;
}

export interface iDatabase{
    eng:string;
    hun:string;
    userId:string;
    category:string;
}

export interface iProps{
    element:iWordElement;
}

export interface iElementData{
    eng:string;
    hun:string;
}

export interface iDatabase{
    database:string;
}

export interface iSuccess{
    successId:string;
    userId:string;
}