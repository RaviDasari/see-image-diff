#!/bin/bash
THUMBS_FOLDER="$1/thumbnails"
mkdir -p $1/thumbnails
cp -a $1/* $1/thumbnails
cd $1/thumbnails
sips -Z 640 *
cd -