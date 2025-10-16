import Person from "../Entity/Person";

class RepositoryPerson {

    private static people: Person[] = [
        new Person(1, "Juan", "Perez"),
        new Person(2, "Maria", "Gomez"),
        new Person(3, "Carlos", "Lopez"),
        new Person(4, "Ana", "Martinez"),
        new Person(5, "Luis", "Rodriguez"),
        new Person(6, "Sofia", "Garcia"),
        new Person(7, "Miguel", "Perez"),
        new Person(8, "Laura", "Sanchez"),
        new Person(9, "Diego", "Ramirez"),
        new Person(10, "Elena", "Torres"),
        new Person(11, "Javier", "Flores"),
        new Person(12, "Carmen", "Rivera"),
        new Person(13, "Andres", "Vargas"),
        new Person(14, "Marta", "Castillo"),
        new Person(15, "Fernando", "Jimenez"),
        new Person(16, "Isabel", "Mendoza"),
        new Person(17, "Ricardo", "Silva"),
        new Person(18, "Patricia", "Cruz"),
        new Person(19, "Santiago", "Morales"),
        new Person(20, "Valeria", "Ortiz")
    ];

    public static getPeople(): Person[] {
        return this.people;
    }
}

export default RepositoryPerson;