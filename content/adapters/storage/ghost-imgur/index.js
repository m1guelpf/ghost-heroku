// jscs:disable requireMultipleVarDecl

'use strict';

var Promise = require('bluebird'),
    BaseStorage = require('ghost-storage-base'),
    imgur = require('imgur');

class ImgurStorage extends BaseStorage {
  constructor() {
    super();
  }

  save(image) {
    // TODO: save delete url
    return imgur.uploadFile(image.path)
        .then(function(json) {
          return json.data.link;
        })
        .catch(function(err) {
          return Promise.reject(err.message);
        });
  }

  exists(fileName, targetDir) {
    // TODO: check file status
    return Promise.resolve(true);
  }

  serve() {
    return function(req, res, next) {
      next();
    };
  }

  delete() {
    return Promise.reject('not implemented');
  }

  read(options) {
  }
}

module.exports = ImgurStorage;