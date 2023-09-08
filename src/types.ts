export type Id = string | number;
export type Column = {
    id: IdleDeadline;
    title: string;
};

export type Task = {
    id: Id;
    columnId: Id;
    content: string;

}