import { expect } from 'chai';
import sinon from 'sinon';
import mockery from 'mockery';

describe('requestJSON', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
  });

  afterEach(() => {
    mockery.deregisterAll();
    mockery.disable();
    sandbox.restore();
  });

  it('should successfully make a network request', (done) => {
    const mockRequestPromise = new Promise(resolve => resolve({ json: () => ({ some: 'data' }) }));
    const httpRequestStub = sandbox.stub().returns(mockRequestPromise);
    mockery.registerMock('./http-request', httpRequestStub);

    const requestJSON = require('./request-json').default; // eslint-disable-line global-require

    requestJSON('http://success.endpoint')
      .then((data) => {
        expect(data).to.deep.equal({ some: 'data' });
        done();
      });
  });

  it('should report an error when a network request fails', (done) => {
    const mockRequestPromise = new Promise((resolve, reject) => reject(new Error('fail')));
    const httpRequestStub = sandbox.stub().returns(mockRequestPromise);
    mockery.registerMock('./http-request', httpRequestStub);

    const requestJSON = require('./request-json').default; // eslint-disable-line global-require

    requestJSON('http://error.endpoint')
      .catch((err) => {
        expect(err.message).to.equal('fail');
        done();
      });
  });
});
