import Person from "../Entity/Person";
class RepositoryPerson{

    static getPerson(): Person[] {
        return [
            new Person(1, "John", "Doe"),
            new Person(2, "Jane", "Doe"),
            new Person(3, "Alice", "Smith"),
            new Person(4, "Bob", "Johnson"),
            new Person(5, "Charlie", "Brown"),
            new Person(6, "David", "Wilson"),
            new Person(7, "Eve", "Davis"),
            new Person(8, "Frank", "Miller"),
            new Person(9, "Grace", "Taylor"),
            new Person(10, "Hank", "Anderson"),
            new Person(11, "Ivy", "Thomas"),
            new Person(12, "Jack", "Jackson"),
            new Person(13, "Kathy", "White"),
            new Person(14, "Leo", "Harris"),
            new Person(15, "Mia", "Martin"),
            new Person(16, "Nina", "Thompson"),
            new Person(17, "Oscar", "Garcia"),
            new Person(18, "Pam", "Martinez"),
            new Person(19, "Quinn", "Robinson"),
            new Person(20, "Ray", "Clark")
        ];
    }
}

export default RepositoryPerson;