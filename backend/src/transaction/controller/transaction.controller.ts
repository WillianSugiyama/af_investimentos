import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Put,
  Request,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { createObjectCsvWriter } from 'csv-writer';
import * as dateFns from 'date-fns';
import * as fs from 'fs';
import { join } from 'path';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../transaction.entity';

@Controller('api/v1/transaction/')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createTransaction(
    @Body() transaction: Transaction,
    @Request() req,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(
      transaction,
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async findAllByUserId(@Request() req) {
    return this.transactionService.findallByUserId(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async updateTransaction(
    @Param(':id') transactionId: number,
    @Body() transaction: Transaction,
  ) {
    return this.transactionService.updateTransaction(
      transactionId,
      transaction,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteTransaction(@Param(':id') transactionId: number) {
    return this.transactionService.deleteTransaction(transactionId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('total')
  async getTotals(@Request() req) {
    return this.transactionService.getTotals(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('buys')
  async getBuys(@Request() req) {
    return this.transactionService.getBuysByUser(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('sells')
  async getSells(@Request() req) {
    return this.transactionService.getSellsByUser(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('composition')
  async getComposition(@Request() req) {
    const userId = req.user.userId;

    const composition = await this.transactionService.compositionByUser(userId);

    if (composition.transactions.length <= 0) {
      throw new HttpException('No transactions found', 404);
    }

    const compositionHeader = Object.keys(composition.transactions[0]);

    const csvHeader = compositionHeader.map((header) => {
      return { id: header, title: header };
    });

    const pathToCSV = join(
      __dirname,
      '..',
      '..',
      'files',
      `${userId}-composition-${dateFns.format(
        new Date(),
        'dd-MM-yyyy__hh-mm-ss',
      )}.csv`,
    );

    fs.writeFile(pathToCSV, '', (err) => {
      if (err) {
        console.log(err);
      }
    });

    const csvWriter = createObjectCsvWriter({
      path: pathToCSV,
      header: csvHeader,
    });

    await csvWriter.writeRecords(composition.transactions);

    const file = fs.createReadStream(pathToCSV);

    return new StreamableFile(file);
  }
}
