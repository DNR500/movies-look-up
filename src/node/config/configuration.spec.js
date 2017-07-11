import { expect } from 'chai';
import sinon from 'sinon';
import mockery from 'mockery';

describe('configAccess', () => {
  let sandbox;
  const processEnvVariables = (config) => {
    const newConfig = Object.assign({}, config);
    newConfig.appId = '123asdf';
    return newConfig;
  };

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

  it('should provide access to the config on initialisation', (done) => {
    const mockFS = { readFile: sandbox.stub() };
    mockery.registerMock('fs', mockFS);

    const configuration = require('./configuration').default; // eslint-disable-line global-require

    configuration.init(processEnvVariables).then((config) => {
      expect(config).to.deep.equal({ env: 'mocha', appId: '123asdf' });
      done();
    });

    mockFS.readFile.getCall(0).args[2](null, '{ "env": "mocha" }');
  });
  it('should provide access to the config without env variables', (done) => {
    const mockFS = { readFile: sandbox.stub() };
    mockery.registerMock('fs', mockFS);

    const configuration = require('./configuration').default; // eslint-disable-line global-require

    configuration.init().then((config) => {
      expect(config).to.deep.equal({ env: 'mocha' });
      done();
    });

    mockFS.readFile.getCall(0).args[2](null, '{ "env": "mocha" }');
  });

  it('should provide access to the config keys after initialisation', (done) => {
    const mockFS = { readFile: sandbox.stub() };
    mockery.registerMock('fs', mockFS);

    const configuration = require('./configuration').default; // eslint-disable-line global-require

    configuration.init(processEnvVariables).then(() => {
      expect(configuration.retrieve('env')).to.equal('mocha');
      expect(configuration.retrieve('appId')).to.equal('123asdf');
      done();
    });

    mockFS.readFile.getCall(0).args[2](null, '{ "env": "mocha" }');
  });
});
