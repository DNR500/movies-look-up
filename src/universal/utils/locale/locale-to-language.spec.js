import { expect } from 'chai';
import localeToLanguage from './locale-to-language';

describe('local to language util', ()=>{
  it('should convert to en to English',()=>{
    const originalString = 'en';
    const expectedString = 'English';

    expect(localeToLanguage(originalString)).to.equal(expectedString);
  });
});