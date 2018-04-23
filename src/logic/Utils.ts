enum BetGroups {
    RED = 'red',
    BLACK = 'black',
    EVEN = 'even',
    ODD = 'odd',
    HIGH = 'high',
    LOW = 'low',
    DOZEN1 = 'dozen_1',
    DOZEN2 = 'dozen_2',
    DOZEN3 = 'dozen_3',
    COLUMNTOP = 'column_top',
    COLUMNMID = 'column_mid',
    COLUMNBOT = 'column_bot',
}

interface Dictionary<T> {
    [Key: string]: T;
}

export { BetGroups, Dictionary };
