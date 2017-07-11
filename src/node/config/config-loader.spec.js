import { expect } from 'chai';
import sinon from 'sinon';
import mockery from 'mockery';

describe('configLoader', () => {
  let sandbox;
  let originalEnv;

  before(() => {
    originalEnv = process.env.NODE_ENV ? process.env.NODE_ENV : '';
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

  after(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('should provide access to the development config', (done) => {
    const mockFS = { readFile: sandbox.stub() };
    mockery.registerMock('fs', mockFS);

    const configLoader = require('./config-loader').default; // eslint-disable-line global-require

    configLoader()
      .then((config) => {
        expect(config).to.deep.equal({ env: 'mocha' });
        done();
      });

    mockFS.readFile.getCall(0).args[2](null, '{ "env": "mocha" }');
  });

  it('should allow acesss to environmental specific config', (done) => {
    process.env.NODE_ENV = 'prod';
    const mockFS = { readFile: sandbox.stub() };
    mockery.registerMock('fs', mockFS);

    const configLoader = require('./config-loader').default; // eslint-disable-line global-require

    configLoader()
      .then((config) => {
        expect(config).to.deep.equal({ env: 'prod' });
        done();
      });

    const filepath = mockFS.readFile.getCall(0).args[0];
    expect(filepath.includes('prod-config.json')).to.be.true;
    mockFS.readFile.getCall(0).args[2](null, '{ "env": "prod" }');
  });
});
