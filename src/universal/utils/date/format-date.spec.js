import { expect } from 'chai';
import formatDate from './format-date';

describe('format date util', ()=>{
  it('should convert to english date format',()=>{
    const originalString = '2012-12-20';
    const expectedString = '20/12/2012';

    expect(formatDate(originalString)).to.equal(expectedString);
  });
});