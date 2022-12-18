import { Test, TestingModule } from '@nestjs/testing';
import { ExAgroinsumosService } from './ex-agroinsumos.service';

describe('ExAgroinsumosService', () => {
  let service: ExAgroinsumosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExAgroinsumosService],
    }).compile();

    service = module.get<ExAgroinsumosService>(ExAgroinsumosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
