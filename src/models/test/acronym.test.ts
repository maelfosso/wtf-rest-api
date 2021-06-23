import faker from 'faker';
import Acronym from "../acronym";

describe('Acronym Model', () => {

  it ('should not insert an acronym with code empty', async () => {
    const invalid = Acronym.build({
      code: '',
      description: faker.lorem.sentence()
    });
    const error = invalid.validateSync();

    expect(error).toBeDefined();
    expect(error?.name).toEqual('ValidationError');
    expect(error?.message).toContain('code');
    expect(error?.message).toContain('required');
  });

  it ('should not insert an acronym with empty description', async () => {
    const invalid = Acronym.build({
      code: faker.lorem.word(),
      description: ''
    });
    const error = invalid.validateSync();

    expect(error).toBeDefined();
    expect(error?.name).toEqual('ValidationError');
    expect(error?.message).toContain('description');
    expect(error?.message).toContain('required');
  });

  it ('should not insert an acronym with already used code', async () => {
    const invalid = Acronym.build({
      code: '',
      description: ''
    });
    const error = invalid.validateSync();

    expect(error).toBeDefined();
    expect(error?.name).toEqual('ValidationError');
  });

  it ('should insert an acronym with code and description filled', async () => {
    const valid = Acronym.build({
      code: faker.lorem.word(),
      description: faker.lorem.paragraph()
    });
    const error = valid.validateSync();

    expect(error).not.toBeDefined();
    
    const saved = await valid.save();
    expect(saved).toBeDefined();
    expect(saved._id).toBeDefined();
    expect(saved.code).toBe(valid.code);
    expect(saved.description).toBe(valid.description);
  });

});