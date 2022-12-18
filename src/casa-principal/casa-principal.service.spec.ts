import { Test, TestingModule } from '@nestjs/testing';
import { CasaPrincipalService } from './casa-principal.service';

describe('CasaPrincipalService', () => {
  let service: CasaPrincipalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasaPrincipalService],
    }).compile();

    service = module.get<CasaPrincipalService>(CasaPrincipalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
