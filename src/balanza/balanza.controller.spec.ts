import { Test, TestingModule } from '@nestjs/testing';
import { BalanzaController } from './balanza.controller';
import { BalanzaService } from './balanza.service';

describe('BalanzaController', () => {
  let controller: BalanzaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanzaController],
      providers: [BalanzaService],
    }).compile();

    controller = module.get<BalanzaController>(BalanzaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
