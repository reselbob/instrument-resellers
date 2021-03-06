'use strict';
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const seeder = require('../dataSeeding/instrumentSeeder');


describe('Instrument Seeder Tests: ', () => {
    it('Can get random Instrument', function(done){
        const instrument = seeder.getRandomInstrument();
        expect(instrument).to.be.an('object');
        expect(instrument.instrument).to.be.a('string');
        expect(instrument.type).to.be.a('string');
        expect(instrument.name).to.be.a('string');
        done();
    });
});