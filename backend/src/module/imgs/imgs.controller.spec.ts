import { Test, TestingModule } from '@nestjs/testing';
import { ImgsController } from './imgs.controller';

describe('Imgs Controller', () => {
  let controller: ImgsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImgsController],
    }).compile();

    controller = module.get<ImgsController>(ImgsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
