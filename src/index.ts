
interface Transaction {
  id: number;
  sourceAccount: string;
  targetAccount: string;
  amount: number;
  category: string;
  time: string;
}
//test data
let input_data: Transaction[] = [
  {
    id: 3,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:34:30.000Z",
  },
  {
    id: 1,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:00.000Z",
  },
  {
    id: 6,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:05.000Z",
  },
  {
    id: 4,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:36:00.000Z",
  },
  {
    id: 2,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:50.000Z",
  },
  {
    id: 5,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:00.000Z",
  },
];

const findDuplicateTransactions = (transactions: Transaction[] = []) => {
  //sort by source and target
  transactions = transactions.sort(
    (a, b) => -1 * b.sourceAccount.localeCompare(a.sourceAccount)
  );
  transactions = transactions.sort(
    (a, b) => -1 * b.targetAccount.localeCompare(a.targetAccount)
  );

  // create groups, each source and target combo will be treated as a group
  let groups: any = {};
  transactions.forEach((el) => {
    groups[el.sourceAccount + " " + el.targetAccount] =
      groups[el.sourceAccount + " " + el.targetAccount] || [];
    groups[el.sourceAccount + " " + el.targetAccount].push(el);
  });
  
  // sort by time
  Object.keys(groups).forEach((k) => {
    groups[k].sort(
      (a: Transaction, b: Transaction) =>
        new Date(a.time).getTime() - new Date(b.time).getTime()
    );
  });

  // flatten the groups back to transactions array
  return Object.values(groups).flat();
};

const result = findDuplicateTransactions(input_data)
console.log('result', result);
