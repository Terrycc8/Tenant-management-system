import { Controller, injectNestClient } from 'nest-client';


@Controller('complaint')
export class ComplaintService {
    constructor() {
        injectNestClient(this)
    }
}
