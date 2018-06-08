'use strict'

var util = require('util');
var BaseStorage = require('../../../core/server/storage/base');
var imgur = require('imgur');
var Promise = require('bluebird');

function ghostImgur(config) {
  this.config = config || {};
  BaseStorage.call(this);
}

util.inherits(ghostImgur, BaseStorage);

ghostImgur.prototype.save = function(file) {
  // TODO: save delete url
  return new Promise(function(resolve, reject) {
    imgur.uploadFile(file.path)
      .then(function(json) {
        if(!json || !json.data || !json.data.link) return reject();
        resolve(json.data.link);
      })
      .catch(reject);
  });
}

ghostImgur.prototype.serve = function() {
  return function(req, res, next) {
    next();
  };
}

ghostImgur.prototype.exists = function(filename) {                        
  return new Promise(function(resolve) {                                  
    // TODO: check file status                                            
    resolve(true);                                                        
  });                                                                     
}                                                                         
                                                                          
ghostImgur.prototype.delete = function(fileName, targetDir) {             
  // TODO: delete image by url                                            
  return new Promise(function(resolve) {                                  
    resolve(false);                                                       
  });                                                                     
};

module.exports = ghostImgur;
