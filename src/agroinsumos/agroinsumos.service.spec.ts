import { Test, TestingModule } from '@nestjs/testing';
import { AgroinsumosService } from './agroinsumos.service';

describe('AgroinsumosService', () => {
  let service: AgroinsumosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgroinsumosService],
    }).compile();

    service = module.get<AgroinsumosService>(AgroinsumosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
