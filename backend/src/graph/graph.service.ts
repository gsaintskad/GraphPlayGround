import { Injectable, Logger } from '@nestjs/common';
import { CreateGraphDto } from './dto/create-graph.dto';
import { UpdateGraphDto } from './dto/update-graph.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GraphService {
  constructor(private prisma: PrismaService) {}
  create(createGraphDto: CreateGraphDto) {
    return 'This action adds a new graph';
  }

  findAll() {
    Logger.log('trying to find all users');
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} graph`;
  }

  update(id: number, updateGraphDto: UpdateGraphDto) {
    return `This action updates a #${id} graph`;
  }

  remove(id: number) {
    return `This action removes a #${id} graph`;
  }
}
