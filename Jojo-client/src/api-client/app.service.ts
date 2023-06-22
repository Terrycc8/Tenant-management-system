import { Controller, Get, injectNestClient } from 'nest-client';


@Controller()
export class AppService {
    constructor() {
        injectNestClient(this)
    }

    @Get()
    getHello(): string {
        throw new Error("stub")
    }
}
