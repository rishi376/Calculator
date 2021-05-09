export class Result{
    operand1!: number;
    operand2!: number;
    operator!: string;
    result!: number;
};

export class CalcHistory{
    history: Result[] = [];
}
