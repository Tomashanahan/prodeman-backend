import { Test, TestingModule } from '@nestjs/testing';
import { AgroinsumosController } from './agroinsumos.controller';
import { AgroinsumosService } from './agroinsumos.service';

describe('AgroinsumosController', () => {
  let controller: AgroinsumosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgroinsumosController],
      providers: [AgroinsumosService],
    }).compile();

    controller = module.get<AgroinsumosController>(AgroinsumosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
