import { Controller, Get } from '@nestjs/common';

@Controller('/graph-playground-backend')
export class AppController {
    @Get('/All')
    getAll(){
        console.log("an http request");
    }
}