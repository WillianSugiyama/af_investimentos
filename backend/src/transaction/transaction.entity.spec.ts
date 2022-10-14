import { Transaction } from './transaction.entity';

describe('TransactionEntity', () => {
  it('should be defined', () => {
    expect(new Transaction()).toBeDefined();
  });
});
