import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
/**
 * Income -> entradas
 * Outcone -> saidas
 */

interface CreateTransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome'; 
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    //entradas
    const income = this.transactions.map((transaction): number => {
      if (transaction.type === 'income'){
        return transaction.value 
      } else {
        return 0;
      }
    }).reduce((acc, curr): number => acc + curr)
    //saidas
    const outcome = this.transactions.map((transaction) : number => {
      if(transaction.type === 'outcome') {
        return transaction.value
      }else{
        return 0;
      }
    }).reduce((acc, curr): number => acc + curr)

    const total = income - outcome;

    //Salado 
    const balance = {income, outcome, total}

    return balance;
  }

  public create({ title, value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    });

    this.transactions.push(transaction)

    return transaction;
  }
}

export default TransactionsRepository;
