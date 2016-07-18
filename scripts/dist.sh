#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
cd ..
grunt dist
tmpdir="tmp-$$"
mkdir -p $tmpdir/tank-defence
cp -r {server,package.json} $tmpdir/tank-defence
cd $tmpdir
rm -rf tank-defence/server/build
tar cvfz tank-defence-dist.tar.gz tank-defence
cd ..
mv $tmpdir/tank-defence-dist.tar.gz .
rm -rf $tmpdir
