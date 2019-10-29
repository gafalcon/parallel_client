
export class Task {

    public subtasks: Array<Task>;

    constructor(
        public id: number,
        public name: string,
        public type: number,
        public status: number,
        public n_experims: number,
        public n_success_experims: number,
        public created: Date,
        public finished: Date
    ) {

    }

    public calculateResult(): number {
        return 4 * (this.n_success_experims / this.n_experims);
    }
}
