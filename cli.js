#!/usr/bin/env node

const tap = require('tap')
const {readFileSync,existsSync} = require('fs')
const checkName = require('npm-name')
const semver = require('semver')

const isReachable = require('is-reachable');
const pckgjson = JSON.parse(readFileSync('package.json').toString());
const registryURL = 'https://registry.npmjs.org/';
// console.log(JSON.stringify())
const {names,keyWords,devDeps,scripts} = require('./requirements.json')
const everythingOk = require('./App')
tap.equal(names.map(name => existsSync(name)).every(bool => bool===true), true)
tap.equal(keyWords.every(r=> Object.keys(pckgjson).includes(r)), true)
tap.equal(scripts.every(r=> Object.keys(pckgjson.scripts).includes(r)), true)
tap.equal(devDeps.every(r=> Object.keys(pckgjson.devDependencies).includes(r)), true)
tap.equal(semver.valid(pckgjson.version), pckgjson.version)
tap.test('Is registry reachable',async t => t.equal(await isReachable(registryURL), true))
tap.test('Package Name Validation ',async t => t.equal(await checkName(pckgjson.name), true))
