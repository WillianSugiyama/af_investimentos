import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/user.entity';
import { Transaction } from '../transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findallByUserId(userId: number): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: { user: { id: userId } },
    });
  }

  async createTransaction(
    transaction: Transaction,
    userId: number,
  ): Promise<Transaction> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return await this.transactionRepository.save({
      ...transaction,
      user: user,
    });
  }

  async updateTransaction(
    transactionId: number,
    transactionData: Partial<Transaction>,
  ): Promise<Transaction> {
    const transaction: Transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new HttpException('Transaction not found', 404);
    }

    const transactionToUpdate = {
      ...transaction,
      ...transactionData,
    };

    return await this.transactionRepository.save(transactionToUpdate);
  }

  async deleteTransaction(transactionId: number): Promise<Transaction> {
    const transaction: Transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new HttpException('Transaction not found', 404);
    }

    return await this.transactionRepository.remove(transaction);
  }

  async getTotals(userId: number): Promise<any> {
    const transactions: Transaction[] = await this.transactionRepository.find({
      where: { user: { id: userId } },
    });

    const totals = {
      buys: 0,
      sells: 0,
      totals: 0,
    };

    transactions.forEach((transaction) => {
      if (transaction.orderType === 'buy') {
        totals.buys += transaction.price;
      } else if (transaction.orderType === 'sell') {
        totals.sells += transaction.price;
      }

      totals.totals += transaction.price;
    });

    return totals;
  }

  async getBuysByUser(userId: number): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: {
        orderType: 'buy',
        user: {
          id: userId,
        },
      },
    });
  }

  async getSellsByUser(userId: number): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: {
        orderType: 'sell',
        user: {
          id: userId,
        },
      },
    });
  }

  async compositionByUser(userId: number): Promise<any> {
    const transactions: Transaction[] = await this.transactionRepository.find({
      where: { user: { id: userId } },
    });

    const totals = {
      buys: 0,
      sells: 0,
      totals: 0,
    };

    const buys = transactions.filter(
      (transaction) => transaction.orderType == 'buy',
    );

    buys.forEach((buy) => {
      totals.buys += buy.total;
    });

    const sells = transactions.filter(
      (transaction) => transaction.orderType == 'sell',
    );

    sells.forEach((sell) => {
      totals.sells += sell.total;
    });

    return {
      transactions,
      total: totals.buys - totals.sells,
    };
  }
}
