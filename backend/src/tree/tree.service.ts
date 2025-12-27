import { Injectable } from '@nestjs/common';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';

@Injectable()
export class TreeService {
  create(createTreeDto: CreateTreeDto) {
    return 'This action adds a new tree';
  }

  findAll() {
    return `This action returns all tree`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tree`;
  }

  update(id: number, updateTreeDto: UpdateTreeDto) {
    return `This action updates a #${id} tree`;
  }

  remove(id: number) {
    return `This action removes a #${id} tree`;
  }
}
