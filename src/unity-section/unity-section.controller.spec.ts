import { Test, TestingModule } from '@nestjs/testing';
import { UnitySectionController } from './unity-section.controller';

describe('UnitySectionController', () => {
  let controller: UnitySectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitySectionController],
    }).compile();

    controller = module.get<UnitySectionController>(UnitySectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
