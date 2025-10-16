import RepositoryPerson from "../Model/Data/RepositoryPerson";
import Person from "../Model/Entity/Person";

class ViewModel{

    private _people: Person[];
    private _selectedPerson: Person | undefined;


    constructor() {
        this._people = RepositoryPerson.getPeople();
    }

    public set selectedPerson(item: Person | undefined) {
        this._selectedPerson = item;
        this.alertSelectedPerson();
    }

    private alertSelectedPerson() {
        alert(`${this._selectedPerson?.name} ${this._selectedPerson?.lastName}`);

    }

    public get People() {
        return this._people;
    }
}

export default ViewModel;