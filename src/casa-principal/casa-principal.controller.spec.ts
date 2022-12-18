import { Test, TestingModule } from '@nestjs/testing';
import { CasaPrincipalController } from './casa-principal.controller';
import { CasaPrincipalService } from './casa-principal.service';

describe('CasaPrincipalController', () => {
  let controller: CasaPrincipalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasaPrincipalController],
      providers: [CasaPrincipalService],
    }).compile();

    controller = module.get<CasaPrincipalController>(CasaPrincipalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
