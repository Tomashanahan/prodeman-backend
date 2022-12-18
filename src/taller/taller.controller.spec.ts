import { Test, TestingModule } from '@nestjs/testing';
import { TallerController } from './taller.controller';
import { TallerService } from './taller.service';

describe('TallerController', () => {
  let controller: TallerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TallerController],
      providers: [TallerService],
    }).compile();

    controller = module.get<TallerController>(TallerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
