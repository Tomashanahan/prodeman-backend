import { Test, TestingModule } from '@nestjs/testing';
import { BalanzaService } from './balanza.service';

describe('BalanzaService', () => {
  let service: BalanzaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanzaService],
    }).compile();

    service = module.get<BalanzaService>(BalanzaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
