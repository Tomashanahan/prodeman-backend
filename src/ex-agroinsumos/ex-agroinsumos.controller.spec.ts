import { Test, TestingModule } from '@nestjs/testing';
import { ExAgroinsumosController } from './ex-agroinsumos.controller';
import { ExAgroinsumosService } from './ex-agroinsumos.service';

describe('ExAgroinsumosController', () => {
  let controller: ExAgroinsumosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExAgroinsumosController],
      providers: [ExAgroinsumosService],
    }).compile();

    controller = module.get<ExAgroinsumosController>(ExAgroinsumosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
