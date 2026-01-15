# See Image Diff

It takes two folders, *base* and *current* full of wonderful images with the same **names** and generates a **diff** folder in a given destination folder with the same **names**. Also, it generates a **JSON** blob with the comparison info and a *neat* web app to navigate through these image files. This uses [jimp](https://github.com/oliver-moran/jimp) to compare the images, which in turn uses an awesome library called [pixelmatch](https://github.com/mapbox/pixelmatch).

![Test & Deploy](https://github.com/RaviDasari/see-image-diff/workflows/Test%20&%20Deploy/badge.svg)
[![npm version](https://img.shields.io/npm/v/see-image-diff.svg)](https://www.npmjs.com/package/see-image-diff)

[![Watch the video](https://github.com/RaviDasari/see-image-diff/blob/master/web/assets/see-image-diff.png)](https://youtu.be/EvdLGdjXnQQ)

## Installation

```bash
npm install see-image-diff

# or

yarn add see-image-diff
```

## Usage

```text
Image comparison utility

  It takes two folders, base and current full of images with same names and     
  generates a diff folder in given destination location with the same names.    
  Also, it generates a JSON blob and a neat web app to navigate through this    
  image files. It uses jimp npm module to compare the images.                   

Synopsis

  $ see-image-diff --baseDir ./base --currentDir ./current --destDir ./diff     
  [--reportFileName "results.json"]                                             
  $ see-image-diff --help                                                       

Options

  -b, --baseDir folder        Baseline images folder used for comparison. Should be flat list of image      
                              files. Can contain a thumbnail folder with same image names.                  
  -c, --currentDir folder     Current images folder used for comparison. Should be flat list of image       
                              files. Can contain a thumbnail folder with same image names.                  
  -d, --destDir folder        Destination folder to save all the diff images. Utility will overwrite any    
                              existing files in this location.                                              
  -t, --threshold number      (Optional) Defaults to 0.1. Ranges 0-1.                                       
  --reportFileName filename   (Optional) Defaults to report.json.                                           
  -h, --help                  Print usage                                                                   
```

## Roadmap

- Refactor UI navbar
- Fix image viewer issues
- Add zoom option to image viewer
- Provide a file server to upload and manage multiple versions — requires a lot of effort, so might not be coming soon
- Need contributors to update the deps and maintain!
