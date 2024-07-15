import { Module } from '@nestjs/common';
import { ormProviders } from './orm.service';

@Module({
    providers:[...ormProviders],
    exports: [...ormProviders]
})
export class OrmModule {}
