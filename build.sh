#!/bin/bash
# cleanup
rm -rf dist/*
yarn build
rm mashup.zip
# add and zip
cp package.json dist/
cp yarn.lock dist/
zip -r mashup.zip dist
