import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getAll(){
        return {"all":"all"}
    }
}