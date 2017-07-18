import { expect } from 'chai';
import limitWordCount from './limit-word-count';

describe('limit word count util', () => {
  it('should reduce word count to the specified number', () => {
    const originalString = 'Hello how are you doing this fine day?';
    const expectedString = 'Hello how are you doing...';

    expect(limitWordCount(originalString, 5)).to.equal(expectedString);
  });
  it('should not add ellipsis if passage is terminated with "."', () => {
    const originalString = 'Hello how are you doing. This fine day.';
    const expectedString = 'Hello how are you doing.';

    expect(limitWordCount(originalString, 5)).to.equal(expectedString);
  });
  it('should not add ellipsis if passage is terminated with "?"', () => {
    const originalString = 'Hello how are you doing? This fine day.';
    const expectedString = 'Hello how are you doing?';

    expect(limitWordCount(originalString, 5)).to.equal(expectedString);
  });
  it('should not add ellipsis if passage is terminated with "!"', () => {
    const originalString = 'Hello how are you doing! This fine day.';
    const expectedString = 'Hello how are you doing!';

    expect(limitWordCount(originalString, 5)).to.equal(expectedString);
  });
  it('should replace a "," with an ellipsis if passage is terminated with ","', () => {
    const originalString = 'Hello how are you doing, this fine day.';
    const expectedString = 'Hello how are you doing...';

    expect(limitWordCount(originalString, 5)).to.equal(expectedString);
  });
});
