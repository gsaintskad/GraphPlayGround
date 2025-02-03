import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/graph-playground-backend')
export class AppController {
    constructor(private appService: AppService) {
    }
    @Get('/All')
    getAll(){
        console.log("an http request");
        return this.appService.getAll()
    }
}