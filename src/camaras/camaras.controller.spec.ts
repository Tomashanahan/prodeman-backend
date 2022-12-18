import { Test, TestingModule } from '@nestjs/testing';
import { CamarasController } from './camaras.controller';
import { CamarasService } from './camaras.service';

describe('CamarasController', () => {
  let controller: CamarasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CamarasController],
      providers: [CamarasService],
    }).compile();

    controller = module.get<CamarasController>(CamarasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
