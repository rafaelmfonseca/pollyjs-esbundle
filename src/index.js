import FetchAdapter from '@pollyjs/adapter-fetch';
import XHRAdapter from '@pollyjs/adapter-xhr';
import { Polly } from '@pollyjs/core';

import InMemoryPersister from './persister-in-memory.js';

Polly.register(XHRAdapter);
Polly.register(FetchAdapter);
Polly.register(InMemoryPersister);

window.Polly = Polly;

window.$pollyIntercept = (options) => {
  const { request, response } = options;

  const polly = new Polly('Polly Session', {
    adapters: ['xhr', 'fetch'],
    persister: 'in-memory-persister',
    logLevel: 'silent'
  });

  const server = polly.server;

  if (request && typeof request === 'function') {
    server.any().on('request', (req, res) => {
      callback(req, res);
    });
  }

  if (response && typeof response === 'function') {
    server.any().on('response', (req, res) => {
      callback(req, res);
    });
  }

  return {
    pollyInstance: polly,
    stop: async () => {
      await polly.flush();
      await polly.stop();
    },
  }
};
