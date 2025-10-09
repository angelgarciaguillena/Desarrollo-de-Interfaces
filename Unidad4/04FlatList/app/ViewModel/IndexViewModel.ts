
import RepositoryPerson from "../Model/Data/RepositoryPerson";
import Person from "../Model/Entity/Person";

class ViewModel{

    static getUsers(): Person[] {
        return RepositoryPerson.getPerson();
    }
}

export default ViewModel;