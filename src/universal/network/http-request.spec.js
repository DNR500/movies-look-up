import { expect } from 'chai';
import sinon from 'sinon';
import httpRequest from './http-request';

describe('httpRequest', () => {
  let originalFetch;
  let sandbox;

  before(() => {
    sandbox = sinon.sandbox.create();
    originalFetch = global.fetch;
    global.fetch = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  after(() => {
    global.fetch = originalFetch;
  });

  it('should successfully make a network request', (done) => {
    global.fetch
      .withArgs('http://successful.endpoint/')
      .returns(new Promise(resolve => resolve({ status: 'ok' })));

    httpRequest('http://successful.endpoint/', { options: 'here' })
      .then((data) => {
        expect(data).to.deep.equal({ status: 'ok' });
        expect(global.fetch.getCall(0).args[0]).to.equal('http://successful.endpoint/');
        expect(global.fetch.getCall(0).args[1]).to.deep.equal({ options: 'here' });
        expect(global.fetch.calledOnce).to.be.true;
        done();
      });
  });

  it('should report an error when a network request fails', (done) => {
    global.fetch
      .withArgs('http://error.endpoint/')
      .returns(new Promise((resolve, reject) => reject(new Error('fail'))));

    httpRequest('http://error.endpoint/', { options: 'here' })
      .catch((err) => {
        expect(err.message).to.equal('fail');
        done();
      });
  });

  it('should report an error when a network request times out', (done) => {
    global.fetch
      .returns({ then: () => ({ catch: () => {} }) });

    const waitTime = 20;

    const expectedMessage = `timeout http request
       - url:http://timeout.endpoint/ 
       - options: {"options":"here"}
       - waited: ${waitTime}ms`;

    httpRequest('http://timeout.endpoint/', { options: 'here' }, waitTime)
      .catch((err) => {
        expect(err.message).to.equal(expectedMessage);
        done();
      });
  });
});
