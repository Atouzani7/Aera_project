import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { ClientService } from './client.service';
// Importe les MODULES, pas les services directement
import { UserModule } from 'src/user/user.module';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { ProjectModule } from 'src/project/project.module';
import { ClientResolver } from './client.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    // On importe les modules dont on a besoin
    UserModule,
    WorkspaceModule,

    // Utilise forwardRef si ProjectModule et ClientModule s'appellent mutuellement
    forwardRef(() => ProjectModule),
  ],
  //UNIQUEMENT le ClientService ici
  providers: [ClientService, ClientResolver],

  // On exporte pour que Les autres modules/ services puisse l'utiliser
  exports: [ClientService],
})
export class ClientModule {}
