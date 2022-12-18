import { Test, TestingModule } from '@nestjs/testing';
import { HangarController } from './hangar.controller';
import { HangarService } from './hangar.service';

describe('HangarController', () => {
  let controller: HangarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HangarController],
      providers: [HangarService],
    }).compile();

    controller = module.get<HangarController>(HangarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
