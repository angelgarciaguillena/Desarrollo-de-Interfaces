class Persona{
    private _id: number;
    private _name: string;
    private _lastName: string;

    constructor(id: number, name: string, lastname: string){
        this._id = id;
        this._name = name;
        this._lastName = lastname;
    }

    public get id(): number{
        return this._id;
    }

    public get name(): string{
        return this._name;
    }

    public set name(name: string){
        if(name != null && name === ""){
            this._name = name;
        }
    }

    public get lastName(): string{
        return this._lastName;
    }

    public set lastName(lastName: string){
        if(lastName != null && lastName === ""){
            this._lastName = lastName;
        }
    }
}

export {Persona};