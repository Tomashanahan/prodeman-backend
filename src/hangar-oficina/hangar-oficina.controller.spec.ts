import { Test, TestingModule } from '@nestjs/testing';
import { HangarOficinaController } from './hangar-oficina.controller';
import { HangarOficinaService } from './hangar-oficina.service';

describe('HangarOficinaController', () => {
  let controller: HangarOficinaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HangarOficinaController],
      providers: [HangarOficinaService],
    }).compile();

    controller = module.get<HangarOficinaController>(HangarOficinaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
